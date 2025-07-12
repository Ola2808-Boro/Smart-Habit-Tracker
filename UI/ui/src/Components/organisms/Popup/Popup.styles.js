import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem;
  border-radius: 24px;
  justify-content: space-around;
  align-items: center;
  min-width: 80%;
  height: 100%;


}
`;
export const StyledCategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;

}
`;

export const StyledCategory = styled.div`
  background-color: ${({ isSelected }) => (isSelected ? "#5f42c0" : "#987afa")};
  font-size: 16px;
  border-radius: 10px;
  padding: 0.3rem;

}
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  resize: none;
  overflow: hidden;
  font-family: inherit;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

export const MoodLegendContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const MoodLegendTypeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MoodTypeContainer = styled.div`
  width: 1.5rem;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  margin-right: 0.5rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
