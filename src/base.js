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

const { width, height } = options.mobile;

exports.start = async () => {
  let browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=${width}, ${height}`]
  });
  return browser;
};

async function getPage(browser) {
  let page = await browser.newPage();
  // await page.setViewport({
  //   width,
  //   height
  // });
  await page.setRequestInterception(true);
  await addIntercept(page);
  await page.emulate(iPhonex);
  return page;
}

async function addIntercept(page) {
  await page.on('request', logRequest);
}

function logRequest(req) {
  if (req.url() === 'https://analytics1.quikr.com/events') {
    // console.log(`A request was made: ${req.url()}`);
    // console.log(req.postData());
    req.abort();
  } else if (
    req.url().endsWith('.webp') ||
    req.url().endsWith('.png') ||
    req.url().endsWith('.jpg')
  ) {
    req.abort();
  } else req.continue();
}

async function removeIntercept(page) {
  await page.removeListener('request', logRequest);
}

exports.open = async (browser, url) => {
  let page = await getPage(browser);
  await Promise.all([page.goto(url), page.waitForNavigation()]);
  removeIntercept(page);
  return page;
};

exports.stop = async browser => {
  browser.close();
};
