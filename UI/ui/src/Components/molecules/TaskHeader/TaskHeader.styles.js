import styled from "styled-components";

export const StyledTaskHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  gap: 1rem;
  & > :last-child {
    margin-left: auto;
  }
`;
