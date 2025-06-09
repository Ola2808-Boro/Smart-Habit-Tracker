import styled from "styled-components";

export const StyledParagraph = styled.p`
  font-size: 18px;
  ${({ checked }) => {
    if (checked === true) {
      return `
            text-decoration: line-through;
            color: gray;
            `;
    } else if (checked === false) {
      return `
            text-decoration: none;
            color: ${({ color }) => color};
            `;
    }
  }}
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
  align-self: ${({ align }) => align};
  font-size: ${({ fontSize }) => fontSize};
  @media (max-width: 768px) {
    font-size: 25px;
  }
`;
