const a = 'a';

const isDigit = !isNaN(parseInt(a)) && !isNaN(Number(a));
console.log(`${a} is a digit: ${isDigit}`);

const isLetter = /^[a-zA-Z]$/.test(a);
console.log(`${a} is a letter: ${isLetter}`);

const upperCase = a.toUpperCase();
console.log(`Uppercase of ${a} is: ${upperCase}`);

const lowerCase = upperCase.toLowerCase();
console.log(`Lowercase of ${upperCase} is: ${lowerCase}`);

export function isDigitChar(c: string): boolean {
  return !isNaN(parseInt(c)) && !isNaN(Number(c));
}

export function isLetterChar(c: string): boolean {
  return /^[a-zA-Z]$/.test(c);
}

export function toUpperCaseChar(c: string): string {
  return c.toUpperCase();
}
