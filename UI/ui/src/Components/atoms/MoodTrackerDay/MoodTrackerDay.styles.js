import styled from "styled-components";

export const StyledMoodTrackerDay = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid black;
  width: calc(100% / 7);
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
  }
`;
