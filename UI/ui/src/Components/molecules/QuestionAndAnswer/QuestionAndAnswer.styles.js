import styled from "styled-components";

export const StyledQandAContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
