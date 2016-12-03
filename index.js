/**
 * The range utility works like the range included in Python 3. It either takes:
 * - a single number representing the stop value (implicitly starting at 0)
 * - 2 numbers representing the start and stop values
 * - 3 numbers representing the start, stop, and step values
 *
 * @see https://docs.python.org/3/library/stdtypes.html#range
 *
 * @param {number} [start=0] - Starting number of the sequence (0 by default)
 * @param {number} stop - Generate up to but not including this number
 * @param {number} [step=1] - Difference between numbers (1 by default)
 * @return {Object} The iterable object representing the sequence
 * @property {function} toArray Converts the sequence into an array of numbers
 * @property {function} lazy Returns the iterable which can be advanced with
 *     `next()`
 * @property {Symbol} iterator Converts the sequence into an array of numbers
 *
 * @example
 * // With only an end value:
 * for (let n in range(10)) {
 *   console.log(n); // logs: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
 * }
 *
 * @example
 * // With a start and end value:
 * for (let n in range(10, 20)) {
 *   console.log(n); // logs: 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
 * }
 *
 * @example
 * // With a start, end, and skip:
 * for (let n in range(0, 20, 2)) {
 *   console.log(n); // logs: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18
 * }
 *
 * @example
 * // As an array using the convenience method `toArray()`:
 * range(0, 100, 20).toArray() // [ 0, 20, 40, 60, 80 ]
 * // Or do it yourself:
 * [ ...range(0, 100, 20) ] // [ 0, 20, 40, 60, 80 ]
 *
 * @example
 * // Using `lazy` to make an infinite list
 * const inf = range(Infinity).lazy();
 * inf.next().value // 0
 * inf.next().value // 1
 * inf.next().value // 2
 * // and on and on...
 */
export default function range(
  start = 0,
  stop = -1,
  step = 1
) {
  if (stop === -1) {
    stop = start;
    start = 0;
  }

  return {
    [Symbol.iterator]: function*() {
      if (start >= stop) return;

      let current = start;
      while (current <= stop - step) {
        yield current;
        current += step;
      }
    },
    lazy () {
      return this[Symbol.iterator]();
    },
    toArray () {
      return [ ...this ];
    }
  };
}
