import styled from "styled-components";

export const StyledButton = styled.button`
  ${({ size }) => {
    if (size === "medium") {
      return `
            width:50%;
            `;
    } else if (size === "small") {
      return `
            width:30%;
            `;
    } else if (size === "big") {
      return `
            width:100%;
            `;
    }
  }}
  font-size: ${({ fontSize }) => fontSize};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;
  margin-top: 0.5rem;
  @media (max-width: 768px) {
    width: 60%;
    font-size: 20px;
  }
`;
