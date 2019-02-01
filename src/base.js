// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');
const width = 1024;
const height = 800;

exports.start = async () => {
  let browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,
    args: [`--window-size=${width}, ${height}`]
  });
  return browser;
}

async function getPage(browser) {
  let page = await browser.newPage();
  await page.setViewport({width, height});
  return page;
}

exports.open = async (browser, url) => {
  let page = await getPage(browser);
  const [response] = await Promise.all([
    page.goto(url),
    page.waitForNavigation()
  ]);
  return page;
}

exports.stop = async (browser) => {
  browser.close();
}
