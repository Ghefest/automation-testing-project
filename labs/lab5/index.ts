/**
 * Lab 5 — Task V10: Serialization-Deserialization
 *
 * This task creates a complex model (Person), serializes it to JSON and XML,
 * deserializes it back, modifies some data, and saves again.
 */

import fs from 'fs';
import path from 'path';
import { create } from 'xmlbuilder2';

interface Address {
  city: string;
  state: string;
}

class Person {
  constructor(
    public name: string,
    public isWorking: boolean,
    public timestamp: number,
    public friends: string[],
    public address?: Address
  ) {}

  toString(): string {
    return `${this.name} [working: ${this.isWorking}] (${this.timestamp})`;
  }
}

// I/O Paths
const inputJsonPath = path.join(__dirname, 'input.json');
const outputJsonPath = path.join(__dirname, 'output.json');
const outputXmlPath = path.join(__dirname, 'output.xml');

// Sample Input Creation
const alex = new Person('Alex', true, 1645532452, ['Emily', 'Michael', 'David'], { city: 'Kyiv', state: 'Kyivska' });

// Save initial input.json
fs.writeFileSync(inputJsonPath, JSON.stringify(alex, null, 2));

// JSON Read & Modify
const jsonData = JSON.parse(fs.readFileSync(inputJsonPath, 'utf-8'));
jsonData.name = 'Alexander';
jsonData.friends.push('John');
fs.writeFileSync(outputJsonPath, JSON.stringify(jsonData, null, 2));

// XML Conversion
const xmlDoc = create({ version: '1.0' })
  .ele('person')
  .ele('name')
  .txt(jsonData.name)
  .up()
  .ele('isWorking')
  .txt(String(jsonData.isWorking))
  .up()
  .ele('timestamp')
  .txt(String(jsonData.timestamp))
  .up()
  .ele('friends');

jsonData.friends.forEach((friend: string) => {
  xmlDoc.ele('friend').txt(friend).up();
});

xmlDoc.up(); // close friends

if (jsonData.address) {
  xmlDoc.ele('address').ele('city').txt(jsonData.address.city).up().ele('state').txt(jsonData.address.state).up().up(); // close address
}

fs.writeFileSync(outputXmlPath, xmlDoc.end({ prettyPrint: true }));

console.log('Lab 5 task completed. Files written:');
console.log('- input.json');
console.log('- output.json (modified)');
console.log('- output.xml');
