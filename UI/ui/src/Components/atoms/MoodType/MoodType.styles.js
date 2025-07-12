import styled from "styled-components";

export const StyledMoodTypeContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
  }
`;

export const StyledMoodType = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 1.5rem;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  margin-right: 0.5rem;
  @media (max-width: 768px) {
  }
`;

export const StyledMoodTypeText = styled.div`
  @media (max-width: 768px) {
  }
`;
