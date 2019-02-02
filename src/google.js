// Google search input field
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
