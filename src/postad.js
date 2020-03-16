async function getPostAdBtn() {
  return '#fixed-category > li:nth-child(5) > a';
}

exports.clickPostAd = async page => {
  const searchSelector = await getPostAdBtn();
  await page.$eval(searchSelector, el => el.click());
  return true;
};
