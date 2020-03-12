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

function logRequest(interceptedReq) {
  if (interceptedReq.url() === 'https://analytics1.quikr.com/events') {
    // console.log(`A request was made: ${interceptedReq.url()}`);
    // console.log(interceptedReq.postData());
    reqArr.push(interceptedReq.postData());
    interceptedReq.abort();
  } else if (
    interceptedReq.url().endsWith('.webp') ||
    interceptedReq.url().endsWith('.png') ||
    interceptedReq.url().endsWith('.jpg')
  ) {
    interceptedReq.abort();
  } else interceptedReq.continue();
}
