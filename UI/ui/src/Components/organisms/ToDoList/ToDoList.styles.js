import styled from "styled-components";

export const StyledToDoList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export const StyledToDoItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ddd6f3;
  cursor: move;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0px;
  align-items: center;
`;

export const StyledToDoItemContainer = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-width: 30%;
  align-items: center;
  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;
