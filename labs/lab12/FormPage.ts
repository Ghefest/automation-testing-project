import { Page } from '@playwright/test';
import { ElementWrapper } from './ElementWrapper';

export class FormPage {
  readonly firstName: ElementWrapper;
  readonly lastName: ElementWrapper;
  readonly mobile: ElementWrapper;
  readonly submitButton: ElementWrapper;

  constructor(private page: Page) {
    this.firstName = new ElementWrapper(page.locator('#firstName'), page);
    this.lastName = new ElementWrapper(page.locator('#lastName'), page);
    this.mobile = new ElementWrapper(page.locator('#userNumber'), page);
    this.submitButton = new ElementWrapper(page.locator('#submit'), page);
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  async login(first: string, last: string, phone: string) {
    await this.firstName.setText(first);
    await this.lastName.setText(last);
    await this.mobile.setText(phone);
  }
}
