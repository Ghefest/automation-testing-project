import { chromium, firefox, Browser, BrowserContext, Page } from 'playwright';

export class DriverPool {
  private static instance: DriverPool;
  private browsers: { [key: string]: Browser } = {};

  private constructor() {}

  static getInstance(): DriverPool {
    if (!DriverPool.instance) {
      DriverPool.instance = new DriverPool();
    }
    return DriverPool.instance;
  }

  async getBrowser(type: 'chromium' | 'firefox' = 'chromium'): Promise<Browser> {
    if (!this.browsers[type]) {
      this.browsers[type] = await (type === 'chromium'
        ? chromium.launch({ headless: true })
        : firefox.launch({ headless: true }));
    }
    return this.browsers[type];
  }

  async getContext(type: 'chromium' | 'firefox' = 'chromium'): Promise<BrowserContext> {
    const browser = await this.getBrowser(type);
    return browser.newContext();
  }

  async getPage(type: 'chromium' | 'firefox' = 'chromium'): Promise<Page> {
    const context = await this.getContext(type);
    return context.newPage();
  }

  async closeAll(): Promise<void> {
    await Promise.all(Object.values(this.browsers).map((browser) => browser.close()));
    this.browsers = {};
  }
}
