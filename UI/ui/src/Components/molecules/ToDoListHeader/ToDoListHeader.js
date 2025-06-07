import PropTypes from "prop-types";
import { StyledToDoListHeader } from "./ToDoListHeader.styles";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import Icon from "../../atoms/Icon/Icon";
const ToDoListHeader = ({ date, handleChangeDate }) => {
  return (
    <StyledToDoListHeader>
      <Icon type="left-arrow" handleChangeDate={handleChangeDate} />
      <Paragraph text={date} fontSize="20px" />
      <Icon type="right-arrow" handleChangeDate={handleChangeDate} />
    </StyledToDoListHeader>
  );
};

ToDoListHeader.defaultProps = {};

ToDoListHeader.propTypes = {};

export default ToDoListHeader;
