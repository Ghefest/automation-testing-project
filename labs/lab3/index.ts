import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function rotateArray(arr: number[], rotateIndex: number): number[] {
  const result = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    let j = i + rotateIndex;
    if (j > arr.length - 1) {
      j = j - arr.length;
    }
    result[i] = arr[j];
  }
  return result;
}

function runTask() {
  const array = [12, 2231, 321, 43, 32];
  const result: number[] = [];

  rl.question('Enter rotation index: ', (input) => {
    try {
      const rotateIndex = parseInt(input);
      if (isNaN(rotateIndex)) throw new Error('Invalid integer input.');

      const rotated = rotateArray(array, rotateIndex);
      console.log('Rotated array:', rotated);

      const list = [...rotated];

      list.unshift(5439);
      list.push(1237);
      list.shift();
      list.pop();

      console.log('Reversed array:');
      for (let i = list.length - 1; i >= 0; i--) {
        process.stdout.write(list[i] + ' ');
      }
      console.log();
    } catch (error) {
      console.log('Error: Please enter a valid integer for the rotation index.');
    } finally {
      rl.close();
    }
  });
}

runTask();
