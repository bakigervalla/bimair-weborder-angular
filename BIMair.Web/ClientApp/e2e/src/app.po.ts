// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getAppTitle(): Promise<string> {
    return element(by.css('app-root .appTitle')).getText();
  }
}
