# Automation Testing Project

This project is a migration from Java-based automation testing to a modern TypeScript-based ecosystem using Playwright for end-to-end (E2E) tests, Vitest for unit tests, and Allure for reporting. It follows a similar architecture found in Java projects (TC → BO → PO) to ease understanding for those familiar with Java.

## 1. Prerequisites

- **Node.js:** Version 18 or higher is recommended.
- **npm:** (or yarn) for package management.
- **Bash:** Used for running shell scripts on Unix-like systems (or a Bash emulator on Windows).
- (Optional) **Docker:** To run the project in a containerized environment.

## 2. Installing Dependencies

Navigate to the project root directory and run:

```bash
npm install
```

This will install all the dependencies listed in package.json.

## 3. Granting Execution Permissions to Bash Scripts

Before running the lab tasks, ensure that all Bash scripts have execution permissions. For example, to grant execute permission to run-lab19.sh, run:

```bash
chmod +x run-lab19.sh
```

Repeat this for any other Bash scripts present in the project.

## 4. Running Project Tests and Lab Tasks

### 4.1 Running Project UI Tests

Project UI tests are located in the project/tests/ui/ directory. Use the following commands:
• To run project UI tests:

```bash
npm run test:project
```

To run project UI tests with Allure report generation and opening:

```bash
npm run test:project:all
```

### 4.2 Running Lab Tasks

Lab tasks are isolated in the labs folder. To execute these tasks:
• General Lab Task Execution:
Set the lab number via the LAB environment variable. For example, to run Lab 6, use:

```bash
LAB=6 npm run run:lab
```

### Running End-to-End (E2E) tests for a lab:

Set the lab number via the LAB environment variable. For example, to run Lab 6, use:

```bash
npm run run:lab 6
```

### Running End-to-End (E2E) tests for a lab:

```bash
npm run e2e:lab
```

Running Unit tests for a lab:

```bash
npm run unit:lab 3
```
