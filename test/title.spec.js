const puppeteer = require('puppeteer');
const base = require('./../src/base');
const title = require('./../src/title')
const URL = 'https://www.quikr.com/mumbai';
let browser;

beforeAll(async () => {
  browser = await base.start();
});

describe("Website", () => {

  beforeEach(() => {
    jest.setTimeout(10000);
  });

  test('Page has title with thenable', (done) => {
    base.open(browser, URL)
      .then((p) => {
        let page = p;
        title.get(page).then((t) => {
          expect(t).toBe(t);
          page.close().then(() => {
            done();
          });
        });
      });
  });

  test('Page has title with async', async (done) => {
    const page = await base.open(browser, URL);
    const t = await title.get(page);
    expect(t).toBe(t);
    await page.close();
    done();
  })
});

afterAll(async () => {
  await base.stop(browser);
});
