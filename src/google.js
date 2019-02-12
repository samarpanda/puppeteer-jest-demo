// Google search input field
/**
 * Get search input field
 * @param {Promise} page 
 */
async function getSearchInput (page) {
  const qSelector = 'input.gLFyf.gsfi';
  const searchInput = await page.$(qSelector);
  return searchInput;
}
exports.getSearchInput = getSearchInput;

exports.search = async (page, query) => {
  const searchInput = await getSearchInput(page);
  await searchInput.type(query);
  await searchInput.press('Enter');
  await page.waitForNavigation();
};

exports.getOrganicResult = async (page) => {
  const resultSelector = '.srg .r > a';
  await page.waitForSelector(resultSelector);

  const linksObj = await page.evaluate(resultSelector => {
    const anchors = Array.from(document.querySelectorAll(resultSelector));
    return anchors.map(anchor => {
      const obj = {};
      obj.title = anchor.firstElementChild.textContent
      obj.link = anchor.href
      return obj
    });
  }, resultSelector);
  return linksObj;
};

exports.crawlPage = async (browser, url) => {
  const newPage = await browser.newPage();

  await newPage.setRequestInterception(true);

  // All requests aborted except document call
  await newPage.on('request', interceptedReq => {
    if(interceptedReq.url() === url) {
      interceptedReq.continue();
    } else {
      interceptedReq.abort();
    }
  });

  await newPage.goto(url)
    .catch(async () => {
      await newPage.close();
    });
  
  let pageObj = await getPageData(newPage);
  pageObj.URL = url;

  await newPage.close();
  return pageObj;
};

async function getPageData(newPage) {
  const pobj = {};
  pobj.title = await newPage.evaluate( x => {
    return document.title
  }, 0);
  pobj.desc = await newPage.evaluate(() => {
    return document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').content : ''
  }, 0);
  pobj.canonical = await newPage.evaluate(() => {
    return document.querySelector('link[rel="canonical"]') ? document.querySelector('link[rel="canonical"]').href : ''
  }, 0);
  pobj.amp = await newPage.evaluate(() => {
    return document.querySelector('link[rel="amphtml"]') ? document.querySelector('link[rel="amphtml"]').href : ''
  }, 0);
  pobj.links = await newPage.evaluate(() => {
      return document.querySelectorAll('a') ? document.querySelectorAll('a').length : ''
  }, 0)
  return pobj;
}
exports.getPageData = getPageData;
