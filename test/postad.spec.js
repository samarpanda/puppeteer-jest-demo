const base = require('./../src/base');
const URL = 'https://www.quikr.com';
const quikr = require('../src/postad');

let browser;

beforeAll(async () => {
  browser = await base.start();
});

describe('Quikr search', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  test('Get PostAd Button', async done => {
    const page = await base.open(browser, URL);
    const result = await quikr.clickPostAd(page);
    expect(result).toBe(true);
    done();
  });
});

afterAll(async () => {
  await base.stop(browser);
});
