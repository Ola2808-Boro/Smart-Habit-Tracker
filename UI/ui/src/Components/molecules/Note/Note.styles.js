import styled from "styled-components";

export const StyledNoteAnswer = styled.div`
  font-size: 14px;
`;
export const StyledRetrievedDate = styled.div`
  text-align: center;
  align-self: center;
  border-radius: 24px;
  background-image: linear-gradient(#e0e7ff, #ddd6f3);
  padding: 0.3rem;
  font-size: 12px;
`;

export const StyledRetrievedNote = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
`;

export const StyledRetrievedQuestion = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
