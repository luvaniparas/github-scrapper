const puppeteer = require("puppeteer");

const scrapeGithubProfile = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    const userName = "luvaniparas";

    // Navigate the page to a URL
    await page.goto(`https://github.com/${userName}`);

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector(".vcard-username");

    const userProfile = await page.evaluate(() => {
      const fullName = document
        .querySelector(".vcard-fullname")
        ?.textContent?.trim();

      const userName = document
        .querySelector(".vcard-username")
        ?.textContent?.trim();

      const profileBio = document
        .querySelector(".user-profile-bio")
        ?.textContent?.trim();

      //   const followers = document
      //     .querySelectorAll(
      //       ".js-profile-editable-area > .js-profile-editable-item > .Counter"
      //     )[0]
      //     .textContent.trim();

      //   const following = document
      //     .querySelectorAll(
      //       ".js-profile-editable-area > .js-profile-editable-item > .Counter"
      //     )[1]
      //     .textContent.trim();

        const following = document
          .querySelectorAll(
            ".js-profile-editable-area > .js-profile-editable-item > .Counter"
          )[1]
          ?.textContent?.trim();

    //   followers, following
      console.log(fullName, userName, profileBio, );
    });
  } catch (error) {
    console.error(error);
  }
};

scrapeGithubProfile();