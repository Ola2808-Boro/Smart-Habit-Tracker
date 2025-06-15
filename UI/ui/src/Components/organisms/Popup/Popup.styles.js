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
