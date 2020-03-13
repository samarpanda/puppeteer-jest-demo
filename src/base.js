// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];

var options = {
  mobile: {
    width: 420,
    height: 520
  },
  desktop: {
    width: 1024,
    height: 800
  }
};

const { width, height } = options.desktop;

exports.start = async () => {
  let browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=${width}, ${height}`]
  });
  return browser;
};

async function getPage(browser) {
  let page = await browser.newPage();
  await page.setViewport({
    width,
    height
  });
  return page;
}

exports.open = async (browser, url) => {
  let page = await getPage(browser);
  await Promise.all([page.goto(url), page.waitForNavigation()]);
  return page;
};

exports.stop = async browser => {
  browser.close();
};
