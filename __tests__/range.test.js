const range = require('../src/index');

test('should return an iterable object with a method toArray', () => {
  const r = range(1, 10);

  expect(r[Symbol.iterator]).toBeInstanceOf(Function);
  expect(r.toArray).toBeInstanceOf(Function);
});

test('should return an iterable object from 0-9', () => {
  let countdown = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  for (let i of range(10)) {
    countdown.shift();
  }

  expect(countdown).toEqual([10]);
});

test('should return an array from 0-9', () => {
  expect(range(10).toArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('should return an iterable 0-40 advancing by tens', () => {
  let actual = [];
  const expected = [0, 10, 20, 30, 40];

  for (let i of range(0, 50, 10)) {
    actual.push(i);
  }

  expect(actual).toEqual(expected);
});

test('should return an array from 12-24 advancing by 2', () => {
  const expected = [12, 14, 16, 18, 20, 22];

  expect(range(12, 24, 2).toArray()).toEqual(expected);
});

test('should return an empty iterable', () => {
  let actual = [];

  for (let i of range(10, 0)) {
    actual.push(i);
  }

  expect(actual).toEqual([]);
});

test('should return an empty array', () => {
  expect(range(100, 0).toArray()).toEqual([]);
});

test('should produce two equal arrays', () => {
  expect(range(0, 100, 20).toArray()).toEqual([ ...range(0, 100, 20) ]);
});

test('should return a lazy infintely nextable iterable', () => {
  const nums = range(Infinity).lazy();

  let count = 0;
  while (count < 1000000) {
    count = nums.next().value;
  }

  const check = nums.next();
  expect(check.value).toBe(1000001);
  expect(check.done).toBeFalsy();
});
