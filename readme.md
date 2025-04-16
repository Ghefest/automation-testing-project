# Automation Testing Project

This project is a migration from Java-based automation testing to a modern TypeScript-based ecosystem using Playwright for end-to-end (E2E) tests, Vitest for unit tests, and Allure for reporting. It follows a similar architecture found in Java projects (TC → BO → PO) to ease understanding for those familiar with Java.

## 1. Prerequisites: Installing Node.js and npm

To run this project, you need to have **Node.js (v18+)** and **npm** installed.

We recommend using **Node Version Manager (nvm)**, which makes it easy to install and switch between Node.js versions.

### 1.1 Installing nvm

#### On macOS / Linux:

1. Open Terminal.
2. Run the installation script:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```
3. After installation, close and reopen your terminal, then verify installation:
   ```bash
   command -v nvm
   ```

#### On Windows:

Use **nvm for Windows**:

1. Go to [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)
2. Download and install the latest `nvm-setup.exe`.
3. After installation, open a new Command Prompt or PowerShell window and verify:
   ```cmd
   nvm version
   ```

### 1.2 Installing Node.js and npm using nvm

After installing nvm, use it to install Node.js:

```bash
nvm install 18
nvm use 18
```

To verify installation:

```bash
node -v
npm -v
```

This ensures you have both Node.js and npm set up correctly.

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
