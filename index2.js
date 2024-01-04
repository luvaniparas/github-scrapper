// API Call using AXIOS
// const axios = require("axios");
// const cheerio = require("cheerio");

// const username = "luvaniparas";
// const url = `https://github.com/${username}`;

// axios(url)
//   .then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const name = $("span.p-name").text().trim();
//     const bio = $("div.p-note.user-profile-bio.mb-3.js-user-profile-bio.f4")
//       .text()
//       .trim();
//     const location = $('li[itemprop="homeLocation"]').text().trim();
//     const email = $('li[itemprop="email"] > a').text().trim();
//     const public_repos = $('span[data-hovercard-type="repository"]')
//       .text()
//       .trim();
//     const followers = $('a[href$="?tab=followers"]').text().trim();
//     const following = $('a[href$="?tab=following"]').text().trim();

//     console.log(`Name: **${name}**`);
//     console.log(`Bio: **${bio}**`);
//     console.log(`Location: **${location}**`);
//     console.log(`Email: **${email}**`);
//     console.log(`Public Repositories: **${public_repos}**`);
//     console.log(`Followers: **${followers}**`);
//     console.log(`Following: **${following}**`);
//   })
//   .catch(console.error);


// 2 API Call using node fetch
// const fetch = require('node-fetch');

// const url = 'https://api.github.com/users/luvaniparas';

// fetch(url)
//   .then(response => response.json())
//   .then(data => {

//     console.log("data :: ",data);

//     console.log(`Name: **${data.name}**`);
//     console.log(`Bio: **${data.bio}**`);
//     console.log(`Location: **${data.location}**`);
//     console.log(`Email: **${data.email}**`);
//     console.log(`Public Repositories: **${data.public_repos}**`);
//     console.log(`Followers: **${data.followers}**`);
//     console.log(`Following: **${data.following}**`);
//   })
//   .catch(console.error);

// 3
const puppeteer = require('puppeteer');

async function scrapeGitHubProfile(username) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = `https://github.com/${username}`;
  await page.goto(url);

  const name = await getText(page,'span.p-name');
  const bio = await getText(page,'div.p-note.user-profile-bio.mb-3.js-user-profile-bio.f4');
  const location = await getText(page,'li[itemprop="homeLocation"]');
  const email = await getText(page,'li[itemprop="email"] > a');
  const public_repos = await getText(page,'span[data-hovercard-type="repository"]');
  const followers = await getText(page,'a[href$="?tab=followers"]');
  const following = await getText(page,'a[href$="?tab=following"]');

  console.log(`Name: **${name}**`);
  console.log(`Bio: **${bio}**`);
  console.log(`Location: **${location}**`);
  console.log(`Email: **${email}**`);
  console.log(`Public Repositories: **${public_repos}**`);
  console.log(`Followers: **${followers}**`);
  console.log(`Following: **${following}**`);

  await browser.close();
}

async function getText(page,selector) {
  try {
    return await page.$eval(selector, el => el?.textContent?.trim());
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return '-';
  }
}

scrapeGitHubProfile('luvaniparas');

