import styled from "styled-components";

export const StyledHabitList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
export const StyledHabitContainer = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 80%;
  @media (max-width: 768px) {
    width: 90%;
    align-items: center;
  }
`;
