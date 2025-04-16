import { Locator, Page } from '@playwright/test';

export class TablePO {
  private readonly page: Page;
  private readonly addNewRecordButton: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly userEmail: Locator;
  private readonly age: Locator;
  private readonly salary: Locator;
  private readonly department: Locator;
  private readonly submit: Locator;
  private readonly userRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNewRecordButton = page.locator('#addNewRecordButton');
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.userEmail = page.locator('#userEmail');
    this.age = page.locator('#age');
    this.salary = page.locator('#salary');
    this.department = page.locator('#department');
    this.submit = page.locator('#submit');
    this.userRow = page.locator('.rt-tr-group');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/webtables');
    return this;
  }

  getAddNewRecordButton() {
    return this.addNewRecordButton;
  }

  getFirstNameInput() {
    return this.firstName;
  }

  getLastNameInput() {
    return this.lastName;
  }

  getUserEmailInput() {
    return this.userEmail;
  }

  getAgeInput() {
    return this.age;
  }

  getSalaryInput() {
    return this.salary;
  }

  getDepartmentInput() {
    return this.department;
  }

  getSubmitButton() {
    return this.submit;
  }

  getUserRow() {
    return this.userRow;
  }
}
