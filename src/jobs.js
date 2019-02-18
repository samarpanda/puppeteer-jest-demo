exports.hasCardResult = async (page) => {
  const resultSelector = '.bkWMgd';
  await page.waitForSelector(resultSelector);

  const data = await page.evaluate((resultSelector) => {
    return document.querySelectorAll(resultSelector).length > 1
    && document.getElementsByTagName('g-card').length > 0;
  }, resultSelector);
  return data;
}
