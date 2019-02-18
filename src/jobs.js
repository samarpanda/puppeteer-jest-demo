exports.hasCardResult = async (page) => {
  const resultSelector = '#search .bkWMgd';
  await page.waitForSelector(resultSelector);
  const data = await page.evaluate((resultSelector) => {
    return document.querySelectorAll(resultSelector).length;
  }, resultSelector);
  return data;
}
