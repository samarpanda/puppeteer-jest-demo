const base = require('./base');
const URL = 'https://www.quikr.com/mumbai'

exports.get = async (page) => {
  const title = await page.evaluate(x => {
    return document.title;
  });
  return title;
};