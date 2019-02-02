exports.get = async (page) => {
  const title = await page.evaluate(() => {
    return document.title;
  }, 0);
  return title;
};
