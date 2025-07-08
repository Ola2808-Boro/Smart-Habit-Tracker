import styled from "styled-components";

export const StyledProgressBar = styled.progress`
  width: 100%;
  height: 100%;
  appearance: none;
  overflow: hidden;
  border-radius: 9999px;
  &::-webkit-progress-bar {
    background-color: #e5e7eb; /* jasnoszary pasek w tle */
    border-radius: 9999px;
  }

  &::-webkit-progress-value {
    background-color: #6366f1; /* Twój fioletowy kolor */
    border-radius: 9999px;
  }

  &::-moz-progress-bar {
    background-color: #6366f1;
    border-radius: 9999px;
  }
`;

export const StyledProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 5vh;
  background-color: rgb(254, 254, 255);
  border-radius: 9999px;
  height: 2rem;
`;
