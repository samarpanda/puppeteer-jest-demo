const base = require('./../src/base');
const google = require('../src/google');
const URL = 'https://www.google.co.in';
const query = 'apartments in thanisandra';
let browser;

beforeAll(async () => {
  browser = await base.start();
});

describe("Google search", () => {

  beforeEach(() => {
    jest.setTimeout(10000);
  });

  // Async await implementation
  test('Get search input field', async (done) => {
    const page = await base.open(browser, URL);
    await google.search(page, query);
    const linksObjArr = await google.getOrganicResult(page);
    expect(linksObjArr.length).toBe(10);
    done();
  })
});

afterAll(async () => {
  await base.stop(browser);
});
