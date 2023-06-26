const fs = require("fs");
const puppeteer = require("puppeteer");

const captureBehanceScreenshots = async (url, path, config = {}) => {
    const defaultConfig = {
        screenshotCount: 3,
    };
    const mergedConfig = { ...defaultConfig, ...config };
    const { screenshotCount } = mergedConfig;
    try {
        // create screenshots folder if it doesn't exist
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        // open headless browser
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(`${url}`, { waitUntil: "networkidle0" });
        // set viewport to 1920x1080
        await page.setViewport({ width: 1920, height: 1080 });
        await page.screenshot({ path: `${path}/screenshot-${Date.now()}.png` });
        console.log(`Screenshots captured for ${url}`);
        // get all project links
        const projectLinks = await page.evaluate(() => {
            const links = document.querySelectorAll("a");
            // get all project links that has href starting with /gallery/
            const filteredLinks = Array.from(links)
                .filter((link) => link.href.startsWith("https://www.behance.net/gallery/"))
                .map((link) => link.href);
            // remove duplicates
            const uniqueLinks = [...new Set(filteredLinks)];
            return uniqueLinks;
        });
        // capture screenshots for projects
        for (let i = 0; i < screenshotCount; i++) {
            await page.goto(projectLinks[i], { waitUntil: "networkidle2" });
            await page.screenshot({
                path: `${path}/screenshot-${Date.now()}.png`,
            });
            console.log(`Screenshots captured for ${projectLinks[i]}`);
        }
        await browser.close();
    } catch (err) {
        console.error(`Failed to capture screenshot for ${url}: ${err}`);
    }
};
const captureGithubScreenshots = async (url, path, config = {}) => {
    const defaultConfig = {
        screenshotCount: 3,
        sortBy: "stars"
    };
    const mergedConfig = { ...defaultConfig, ...config };
    const { screenshotCount, sortBy } = mergedConfig;
    try {
        // create screenshots folder if it doesn't exist
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        await page.setViewport({ width: 1920, height: 1080 });
        await page.screenshot({ path: `${path}/screenshot-${Date.now()}.png` });
        console.log(`Screenshots captured for ${url}`);
        // get repositories url
        let repositoriesUrl = url + "?tab=repositories";
        // set repositories url based on sortBy
        switch (sortBy) {
            case "stars":
                repositoriesUrl = url + "?tab=repositories&q=&type=&language=&sort=stargazers";
                break;
            case "name":
                repositoriesUrl = url + "?tab=repositories&q=&type=&language=&sort=name";
                break;
            case "latest":
                repositoriesUrl = url + "?tab=repositories&q=&type=&language=&sort=";
                break;
            default:
                repositoriesUrl = url + "?tab=repositories";
                break;
        }
        await page.goto(repositoriesUrl, { waitUntil: "networkidle0" })
        // get all project links
        const projectLinks = await page.evaluate(() => {
            // get all project links that has itemprop="name codeRepository"
            const links = document.querySelectorAll(
                "a[itemprop='name codeRepository']"
            );
            return Array.from(links).map((link) => link.href);
        });
        // capture screenshots for projects
        for (let i = 0; i < screenshotCount; i++) {
            await page.goto(projectLinks[i], { waitUntil: "networkidle2" });
            await page.screenshot({
                path: `${path}/screenshot-${Date.now()}.png`,
            });
            console.log(`Screenshots captured for ${projectLinks[i]}`);
        }
        await browser.close();
    } catch (err) {
        console.error(`Failed to capture screenshot for ${url}: ${err}`);
    }
};

module.exports = {
    captureBehanceScreenshots,
    captureGithubScreenshots,
};
