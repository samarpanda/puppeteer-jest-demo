const base = require('./../src/base');
const quikr = require('../src/qanalytics');
const URL = 'https://www.quikr.com';
const query = 'pet dog';
let browser;

beforeAll(async () => {
  browser = await base.start();
});

describe('Quikr search', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  test('Get search input field', async done => {
    const page = await base.open(browser, URL);
    const result = await quikr.search(page, query);
    expect(result.length).toBe(2);
    done();
  });
});

afterAll(async () => {
  await base.stop(browser);
});
