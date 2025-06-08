import styled from "styled-components";

export const StyledCategory = styled.div`
  font-size: ${({ fontSize }) => fontSize};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  border-radius: 10px;
  padding: 0.3rem;
  @media (max-width: 768px) {
    width: 60%;
    font-size: 20px;
  }
`;
