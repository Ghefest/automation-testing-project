import { Page } from '@playwright/test';

export abstract class BasePageFactory<TPageObject> {
  constructor(protected readonly page: Page) {}

  abstract register(): TPageObject;
}
