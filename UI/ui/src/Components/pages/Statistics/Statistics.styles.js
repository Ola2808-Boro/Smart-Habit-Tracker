import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  gap: 1rem;
  padding: 1rem;

  > * {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    align-items: center;
    justify-content: center;
    min-height: 350px;
    max-height: 450px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    > * {
      max-width: 95%;
      max-height: 100vh;
    }
  }

  @media (max-width: 500px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
`;
