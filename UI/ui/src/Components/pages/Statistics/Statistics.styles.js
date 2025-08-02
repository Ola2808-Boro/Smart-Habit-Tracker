import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
`;
