import styled from "styled-components";

export const StyledTitle=styled.p`
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
  color: ${({ color }) => color};
  font-weight:${({fontWeight})=>fontWeight};
  

`;