import styled from "styled-components";

export const StyledInput = styled.input`
  font-size: 16px;
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
`;
