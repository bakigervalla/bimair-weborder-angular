// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

import { AppPage } from './app.po';

describe('BIMair App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display application title: BIMair', async () => {
    await page.navigateTo();
    expect(await page.getAppTitle()).toEqual('BIMair');
  });
});
