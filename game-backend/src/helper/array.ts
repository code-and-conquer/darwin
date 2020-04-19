/**
 * Implementation of
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 */
export function shuffleArray<T>(originalArray: T[]): T[] {
  const array: T[] = [...originalArray];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const pickRandom = <T>(array: Array<T>): T => {
  const { length } = array;
  const randomIndex = Math.floor(Math.random() * length);
  return array[randomIndex];
};
