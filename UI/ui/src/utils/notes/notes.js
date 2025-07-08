export function randomQuestionIdx(max, lastQuestionIdx) {
  let random_idx;
  if (max > 1) {
    do {
      random_idx = Math.floor(Math.random() * max) + 1;
    } while (random_idx === lastQuestionIdx);
  } else {
    random_idx = 1;
  }
  return random_idx;
}
