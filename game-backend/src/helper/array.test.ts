import { shuffleArray, pickRandom } from './array';

describe('shuffleArray', () => {
  /**
   * Tests position of an element after array shuffle based on probability.
   * This test asserts that an element can be found with a high probability in all places.
   * If the test fails often consider increasing test samples or switching the algorithm.
   */
  it('shuffles fairly', () => {
    const array = ['test', '', '', '', ''];

    const testStringDistribution = [0, 0, 0, 0, 0];
    for (let i = 0; i < 1000; i++) {
      const newArray = shuffleArray(array);
      const index = newArray.indexOf('test');
      testStringDistribution[index]++;
    }
    const average =
      testStringDistribution.reduce(
        (total, occurence) => total + occurence,
        0
      ) / testStringDistribution.length;

    const expectDifference = (occurenceCount: number): void => {
      expect(Math.abs(average - occurenceCount)).toBeLessThan(50);
    };

    testStringDistribution.forEach(occurence => expectDifference(occurence));
  });
});

describe('pickRandom', () => {
  /**
   * Tests pick count of an element based on probability.
   * This test asserts that each element was a picked as often as the others with a high probability.
   */
  it('picks fairly', () => {
    const array = [0, 1, 2, 3];

    const pickDistribution = [0, 0, 0, 0];
    for (let i = 0; i < 1000; i++) {
      const random = pickRandom(array);
      pickDistribution[random]++;
    }

    const least = Math.min(...pickDistribution);
    const most = Math.max(...pickDistribution);
    const difference = most - least;

    expect(difference).toBeLessThan(100);
  });
});
