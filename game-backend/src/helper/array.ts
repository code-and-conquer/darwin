const pickRandom = <T>(array: Array<T>): T => {
  const { length } = array;
  const randomIndex = Math.floor(Math.random() * length);
  return array[randomIndex];
};

export default pickRandom;
