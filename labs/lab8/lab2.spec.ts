import { describe, it, expect } from 'vitest';
import { isDigitChar, isLetterChar, toUpperCaseChar } from '../lab2/index';

describe('Task8 – Tests for Task2 functions', () => {
  it.each([
    ['0', true],
    ['a', false],
  ])('isDigit(%s) => %s', (input, expected) => {
    expect(isDigitChar(input)).toBe(expected);
  });

  it.each([
    ['a', true],
    ['5', false],
  ])('isLetter(%s) => %s', (input, expected) => {
    expect(isLetterChar(input)).toBe(expected);
  });

  it.each([
    ['a', 'A'],
    ['Z', 'Z'],
  ])('toUpperCase(%s) => %s', (input, expected) => {
    expect(toUpperCaseChar(input)).toBe(expected);
  });
});

describe('Character from ENV test', () => {
  it('uses process.env.CHAR', () => {
    const char = process.env.CHAR || 'x';
    expect(toUpperCaseChar(char)).toBe(char.toUpperCase());
  });
});
