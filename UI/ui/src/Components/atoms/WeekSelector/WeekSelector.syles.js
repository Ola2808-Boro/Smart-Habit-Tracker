import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export const StyledWeekControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const StyledButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e3e3e3;
  }
`;

export const StyledDateRange = styled.span`
  font-weight: bold;
`;

export const StyledDatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const StyledInput = styled.input`
  margin-top: 4px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;
