const base = require('./../src/base');
const google = require('../src/google');
const jobs = require('../src/jobs');
const URL = 'https://www.google.co.in';
const query = 'delivery jobs';
let browser;

beforeAll(async () => {
  browser = await base.start();
});

describe("Google Jobs search", () => {

  beforeEach(() => {
    jest.setTimeout(10000);
  });

  test('Has jobs cards result', async (done) => {
    const page = await base.open(browser, URL);
    await google.search(page, query);

    const data = jobs.getCardsResult(page);
    expect(data).not.toBe(null);
    done();
  });
});

afterAll(async () => {
  await base.stop(browser);
});
