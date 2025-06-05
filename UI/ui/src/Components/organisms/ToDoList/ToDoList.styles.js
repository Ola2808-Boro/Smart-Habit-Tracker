import styled from "styled-components";

export const StyledToDoList=styled.div`

    width:100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  

`;

export const StyledToDoItem=styled.div`

    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ddd6f3;
    cursor: move;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    margin: 5px 0px;
    align-items:center;
  

`;

