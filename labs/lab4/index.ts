/**
 * Lab 4 — Task V1 (Converted from Java)
 *
 * a) Semaphore: Limit concurrent access using a custom Semaphore class.
 * b) Reflection: Inspect and invoke methods of a custom class.
 * c) Generics: Interface + implementation with custom class and reflection.
 */

class Semaphore {
  private permits: number;
  private queue: (() => void)[] = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  acquire(task: () => void) {
    if (this.permits > 0) {
      this.permits--;
      task();
      this.release();
    } else {
      this.queue.push(task);
    }
  }

  release() {
    this.permits++;
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      if (next) {
        this.permits--;
        next();
        this.release();
      }
    }
  }
}

// a) Run tasks with semaphore
const semaphore = new Semaphore(2);
for (let i = 0; i < 5; i++) {
  semaphore.acquire(() => {
    console.log(`Running task ${i}`);
  });
}

// b) Reflection-like behavior
class MyCustomClass {
  name: string = 'Reflection Tester';

  sayHello() {
    return 'Hello from MyCustomClass';
  }

  sayGoodbye() {
    return 'Goodbye from MyCustomClass';
  }
}

const instance = new MyCustomClass();
const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter(
  (m) => typeof (instance as any)[m] === 'function' && m !== 'constructor'
);

console.log('\nDeclared methods:');
for (const method of methods) {
  const result = (instance as any)[method]();
  console.log(`${method}(): ${result}`);
}

// Invoke specific method
const methodName = 'sayHello';
if (methods.includes(methodName)) {
  console.log(`\nInvoking ${methodName}():`, (instance as any)[methodName]());
}

// c) Generics
interface Printer<T> {
  print(value: T): void;
}

class MyGenericPrinter implements Printer<string> {
  print(value: string): void {
    console.log('Printed value:', value);
  }
}

const printer = new MyGenericPrinter();
printer.print('Generic Hello');
