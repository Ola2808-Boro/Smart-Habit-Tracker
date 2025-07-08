import styled from "styled-components";

export const StyledDragItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  cursor: move;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0px;
  background-color: #ddd6f3;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    font-size: 23px;
  }
`;

export const Categories = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px;
  @media (max-width: 768px) {
    font-size: 23px;
  }
`;

export const Category = styled.div`
  background-color: #987afa;
  border-radius: 10px;
  padding: 0.3rem;
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 0.5rem;
  }
`;
