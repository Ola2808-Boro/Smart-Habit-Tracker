import styled, { css } from "styled-components";

export const StyledInput = styled.input`
  font-size: 16px;
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};

  ${({ hiddenInput }) => {
    if (hiddenInput === true) {
      return `
            display:none
            `;
    }
  }}
`;
