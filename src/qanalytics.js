let reqArr = [];

async function getSearchInputSelector() {
  return 'form.toolbar-search .toolbar-search__field';
}

exports.search = async (page, query) => {
  const searchSelector = await getSearchInputSelector();
  await page.setRequestInterception(true);
  await addIntercept(page);
  await page.$eval(searchSelector, el => el.click());
  await page.keyboard.type(query);
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await removeIntercept(page);
  return reqArr;
};

async function addIntercept(page) {
  await page.on('request', logRequest);
}

async function removeIntercept(page) {
  await page.removeListener('request', logRequest);
}

function logRequest(req) {
  if (req.url() === 'https://analytics1.quikr.com/events') {
    let data = req.postData();
    data = mockDynamicData(data);
    reqArr.push(data);
    req.abort();
  } else if (
    req.url().endsWith('.webp') ||
    req.url().endsWith('.png') ||
    req.url().endsWith('.jpg')
  ) {
    req.abort();
  } else req.continue();
}

function mockDynamicData(data) {
  let res = JSON.parse(data);
  res.cookie_id = '7300a5c3-2136-4384-8f52-c09fa4b182e5';
  res.events[0].event_time_epoc_ms = 1583990619717;
  res.events[0].event_id = '6edf5f52-aa2c-42b1-9ad2-27d9ed7d2af8';
  return res;
}
