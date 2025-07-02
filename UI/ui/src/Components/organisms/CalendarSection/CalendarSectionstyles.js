import styled from "styled-components";

export const StyledCalendarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around
    align-items: stretch;
  }
`;
