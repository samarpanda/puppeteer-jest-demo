exports.hasCardResult = async (page) => {
  const resultSelector = 'g-card';
  await page.waitForSelector(resultSelector);

  const data = await page.evaluate(() => {
    return document.getElementsByTagName('g-card');
  }, 0);

  return data;
}

