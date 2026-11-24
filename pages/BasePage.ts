
import { Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  // Constructor initializes the Playwright Page instance. The page is protected so child Page Objects can use it.
  constructor(page: Page) {
    this.page = page;
  }

  // Opens a relative URL using the configured Playwright baseURL.
  async open(path: string) {
    await this.page.goto(path);
  }
}