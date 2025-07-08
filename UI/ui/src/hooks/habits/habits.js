// src/hooks/useMoodTracker.ts
import { useState, useEffect } from "react";

export function useDroppedItemse() {
  const [droppedItems, setDroppedItems] = useState([]);

  const addDroppedItems = (item) => {
    setDroppedItems((prev) => {
      const newState = [...prev];
      newState.push({
        task: item.name,
        done: false,
        time: "0:00",
        categories: item.categories,
      });
      return newState;
    });
  };

  const removeDroppedItems = (index) => {
    const updatedHabits = [...droppedItems];
    updatedHabits.splice(index, 1);
    setDroppedItems(updatedHabits);
  };

  const updateDroppedItems = (item) => {
    setDroppedItems(item);
  };

  const updateDroppedItemTime = (taskName, newTime) => {
    setDroppedItems((prev) =>
      prev.map((task) =>
        task.task === taskName ? { ...task, time: newTime } : task
      )
    );
  };
  const updateDroppedItemChecked = (taskName, selectedTime, isChecked) => {
    setDroppedItems((prev) => {
      const newState = prev.map((item) => {
        if (item.task === taskName) {
          return { ...item, done: isChecked, time: selectedTime };
        }
        return item;
      });
      return newState;
    });
  };
  return {
    droppedItems,
    addDroppedItems,
    removeDroppedItems,
    updateDroppedItems,
    updateDroppedItemTime,
    updateDroppedItemChecked,
  };
}

export function useCategories() {
  const [categories, setCategories] = useState({});

  const selectCategory = (e) => {
    setCategories((prev) => {
      const newState = { ...prev };
      newState[e.target.dataset.category] = true;
      return newState;
    });
  };

  const addCategory = (category) => {
    setCategories((prev) => {
      const newState = { ...prev };
      newState[category] = false;
      return newState;
    });
  };
  const resetCategory = (item) => {
    setCategories(item);
  };

  return {
    categories,
    selectCategory,
    resetCategory,
    addCategory,
  };
}

export const useInitialData = (
  getCategories,
  getHabits,
  getTasks,
  getWeaklyProgressStats
) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCategories();
      await getHabits();
      await getTasks();
      await getWeaklyProgressStats();
    };
    fetchData();
  }, []);
};

export const useProgressValue = (
  droppedItems,
  setProgressValue,
  getWeaklyProgressStats
) => {
  useEffect(() => {
    let doneTask = 0;
    Object.values(droppedItems).forEach((data) => {
      if (data.done === true) {
        doneTask += 1;
      }
    });
    setProgressValue(doneTask);
    const fetchData = async () => {
      await getWeaklyProgressStats();
    };
    fetchData();
  }, [droppedItems]);
};

export const useTasksOnDateChange = (
  getTasks,
  selectedDateRef,
  selectedDate
) => {
  useEffect(() => {
    const fetchData = async () => {
      await getTasks();
      selectedDateRef.current = selectedDate;
    };
    fetchData();
  }, [selectedDate]);
};

export const useUpdatedHabits = (newHabit, getHabits) => {
  useEffect(() => {
    const fetchData = async () => {
      await getHabits();
    };
    fetchData();
  }, [newHabit]);
};
