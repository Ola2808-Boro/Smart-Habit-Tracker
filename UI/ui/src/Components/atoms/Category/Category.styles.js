import styled from "styled-components";

export const StyledCategory = styled.div`
  
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ theme }) => theme.font.family.poppins};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  border-radius: 10px;
  padding: 0.3rem;


`;