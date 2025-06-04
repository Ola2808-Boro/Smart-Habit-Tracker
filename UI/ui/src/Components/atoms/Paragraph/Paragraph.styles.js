import styled from "styled-components";

export const StyledParagraph=styled.p`
    ${({ size }) => {
    if (size === "medium") {
      return `
            font-size:18px;
            `;
    } else if (size === "small") {
      return `
            font-size:16px;
            `;
    }
    
  }}
  ${({ checked }) => {
    if (checked === true) {
      return `
            text-decoration: line-through;
            color: gray;
            `;
    } else if (checked ===false) {
      return `
            text-decoration: none;
            color: ${({ color }) => color};
            `;
    }
    
  }}
  color: ${({ color }) => color};
  font-weight:${({fontWeight})=>fontWeight};
  align-self:${({align})=>align};

`;