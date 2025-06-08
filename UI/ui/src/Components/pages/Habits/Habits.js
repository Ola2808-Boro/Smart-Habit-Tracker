import React, { useState, useRef } from "react";
import PageTitle from "../../atoms/PageTitle/PageTitle.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactJsAlert from "reactjs-alert";
import ToDoList from "../../organisms/ToDoList/ToDoList.js";
import HabitList from "../../organisms/HabitList/HabitList.js";
import Popup from "../../organisms/Popup/Popup.js";
import { MainContainer } from "./Habits.styles.js";
import {
  useDroppedItemse,
  useCategories,
  useInitialData,
  useProgressValue,
  useTasksOnDateChange,
  useUpdatedHabits,
} from "../../../hooks/habits/habits.js";
import {
  validateDate,
  convertPythonTimeToInputTime,
  setNewDate,
} from "../../../utils/habits/habits.js";
import {
  retrieveTasksRequest,
  addCategoryRequest,
  retrieveHaibtsRequest,
  removeTaskRequest,
  saveTaskRequest,
  saveHabitRequest,
  retrieveCategoriesRequest,
} from "../../../api/habits/habits.js";

const Habits = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [progressValue, setProgressValue] = useState(0.0);
  const [selectedDate, setSelectedDate] = useState(
    `${
      months[new Date().getMonth()]
    } ${new Date().getDate()},${new Date().getFullYear()}`
  );
  const {
    droppedItems,
    addDroppedItems,
    removeDroppedItems,
    updateDroppedItems,
    updateDroppedItemTime,
    updateDroppedItemChecked,
  } = useDroppedItemse();
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [isHabitPopupOpen, setIsHabitPopupOpen] = useState(false);
  const [category, setCategory] = useState("");
  const { categories, selectCategory, resetCategory, addCategory } =
    useCategories();
  const [newHabit, setNewHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    quote: "",
    type: "info",
  });
  const selectedDateRef = useRef(selectedDate);

  useInitialData(getCategories, getHabits, getTasks);
  useProgressValue(droppedItems, setProgressValue);
  useTasksOnDateChange(getTasks, selectedDateRef, selectedDate);
  useUpdatedHabits(newHabit, getHabits);
  async function handleDrop(item) {
    const dateValidation = await validateDate(selectedDateRef, months);
    if (dateValidation) {
      setAlert({
        visible: true,
        title: "Adding new task",
        quote: "Cannot add task for past/future todo lists ",
        type: "warning",
      });
    } else {
      addDroppedItems(item);
      await saveTaskRequest(item.name, "0:00:00", selectedDate);
    }
  }

  async function handleRemoveItem(index) {
    const updatedHabits = [...droppedItems];
    await removeTaskRequest(updatedHabits[index]);
    removeDroppedItems(index);
  }

  async function handleSelectCategory(e) {
    selectCategory(e);
  }
  async function handleAddHabit(e) {
    e.preventDefault();
    const response = await saveHabitRequest(categories, newHabit);
    if (response.data["message"] === "Habit already exists") {
      setAlert({
        visible: true,
        title: "Adding habit",
        quote: "Habit already exists",
        type: "info",
      });
    }
    setIsHabitPopupOpen(false);
    setNewHabit("");
    const newState = Object.fromEntries(
      Object.keys(categories).map((key) => [key, false])
    );
    resetCategory(newState);
  }
  async function getCategories() {
    const response = await retrieveCategoriesRequest();
    if (response.status === 204) {
      resetCategory({});
      return;
    }
    const newCategories = response.data.category.reduce((acc, category) => {
      acc[category] = false;
      return acc;
    }, {});
    resetCategory(newCategories);
  }
  async function getHabits() {
    const response = await retrieveHaibtsRequest();
    if (response.status === 204) {
      setHabits([]);
      return;
    }
    setHabits(response.data.habit);
  }

  async function getTasks() {
    let newDate = new Date(selectedDate);
    const newSelectedDate = `${newDate.getFullYear()}-${String(
      newDate.getMonth() + 1
    ).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`;
    const response = await retrieveTasksRequest(newSelectedDate);
    if (response.status === 204) {
      updateDroppedItems([]);
      return;
    }
    const convertedTasks = response.data.task.map((task) => ({
      ...task,
      time: convertPythonTimeToInputTime(task.time),
    }));
    updateDroppedItems(convertedTasks);
  }

  async function handleAddCategory(e) {
    e.preventDefault();
    const response = await addCategoryRequest(category);
    if (response.data["message"] === "Category already exists") {
      setAlert({
        visible: true,
        title: "Adding category",
        quote: "Category already exists",
        type: "info",
      });
    } else if (response.data["message"] === "Added successfully category") {
      addCategory(category);
    }
    setIsCategoryPopupOpen(false);
    setCategory("");
  }

  async function handleTimeChange(taskName, newTime) {
    updateDroppedItemTime(taskName, newTime);
  }
  async function handleChangeDate(e) {
    e.preventDefault();
    const arrow = e.currentTarget.dataset.arrow;
    let newDate = new Date(selectedDate);
    const newSelectedDate = await setNewDate(arrow, newDate, months);
    setSelectedDate(newSelectedDate);
  }
  async function handleCheckBoxClick(e) {
    const dateValidation = await validateDate(selectedDateRef, months);
    if (dateValidation) {
      setAlert({
        visible: true,
        title: "Completion of the task",
        quote: "Cannot finish the task for past/future todo lists ",
        type: "warning",
      });
    } else {
      const parentDiv = e.target.closest("div");
      const timeInput = parentDiv.querySelector('input[type="time"]');
      const selectedTime = timeInput?.value || "";
      if (selectedTime === "") {
        setAlert({
          visible: true,
          title: "Completion of the task",
          quote: "Cannot finish the task, time is zero ",
          type: "warning",
        });
      } else {
        const taskName = e.target.dataset.task;
        const isChecked = e.target.checked;
        const selectedTime = timeInput?.value || "";
        updateDroppedItemChecked(taskName, selectedTime, isChecked);
        await saveTaskRequest(taskName, selectedTime, selectedDate);
      }
    }
  }

  return (
    <>
      <PageTitle />
      <MainContainer>
        <DndProvider backend={HTML5Backend}>
          <ToDoList
            droppedItems={droppedItems}
            handleTimeChange={handleTimeChange}
            handleCheckBoxClick={handleCheckBoxClick}
            handleRemoveItem={handleRemoveItem}
            handleDrop={handleDrop}
            selectedDate={selectedDate}
            progressValue={progressValue}
            handleChangeDate={handleChangeDate}
          />

          <HabitList
            habits={habits}
            setIsHabitPopupOpen={setIsHabitPopupOpen}
            setIsCategoryPopupOpen={setIsCategoryPopupOpen}
          />
          <Popup
            open={isHabitPopupOpen}
            type="save-habit"
            setIsOpen={setIsHabitPopupOpen}
            handleAdd={handleAddHabit}
            handleSelectCategory={handleSelectCategory}
            value={newHabit}
            setNewValue={setNewHabit}
            categories={categories}
          />
          <Popup
            open={isCategoryPopupOpen}
            type="save-category"
            setIsOpen={setIsCategoryPopupOpen}
            handleAdd={handleAddCategory}
            value={category}
            categories={categories}
            handleSelectCategory={handleSelectCategory}
            setNewValue={setCategory}
          />
        </DndProvider>

        <ReactJsAlert
          status={alert.visible}
          type={alert.type}
          title={alert.title}
          isQuotes={true}
          quote={alert.quote}
          Close={() => setAlert((prev) => ({ ...prev, visible: false }))}
        />
      </MainContainer>
    </>
  );
};

export default Habits;
