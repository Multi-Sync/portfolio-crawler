const fs = require("fs");
// track time taken to capture screenshots
const start = Date.now();
const puppeteer = require("puppeteer");

const behanceUrl = "https://www.behance.net/engymaged9942e";
const githubUrl = "https://github.com/wRAR";
const captureBehanceScreenshots = async (url, userId) => {
    try {
        const path = `${userId}-Behance`;
        // create screenshots folder if it doesn't exist
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        } else {
            // how many files are in the folder
            const files = fs.readdirSync(path);
            if (files.length > 0) {
                // if there are files, delete them and start fresh
                files.forEach((file) => {
                    fs.unlinkSync(`${path}/${file}`);
                });
                console.log(`OLd files deleted from ${path}`);
            }
        }
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        await page.setViewport({ width: 1920, height: 1080 });
        await page.screenshot({ path: `${path}/screenshot-${Date.now()}.png` });
        console.log(`Screenshots captured for ${url}`);
        // track time taken to capture screenshots
        const end = Date.now();
        console.log(`Time taken to capture screenshots: ${end - start}ms`);
        // get all project links
        const projectLinks = await page.evaluate(() => {
            const links = document.querySelectorAll("a.js-project-link");
            return Array.from(links).map((link) => link.href);
        });
        // console.log(`Project links: ${projectLinks}`);
        // capture screenshots for top 3 projects
        for (let i = 0; i < 3; i++) {
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
const captureGithubScreenshots = async (url, userId) => {
    try {
        const path = `${userId}-Github`;
        // create screenshots folder if it doesn't exist
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        } else {
            // how many files are in the folder
            const files = fs.readdirSync(path);
            if (files.length > 0) {
                // if there are files, delete them and start fresh
                files.forEach((file) => {
                    fs.unlinkSync(`${path}/${file}`);
                });
                console.log(`OLd files deleted from ${path}`);
            }
        }
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        await page.setViewport({ width: 1920, height: 1080 });
        await page.screenshot({ path: `${path}/screenshot-${Date.now()}.png` });
        console.log(`Screenshots captured for ${url}`);
        // track time taken to capture screenshots
        const end = Date.now();
        console.log(`Time taken to capture screenshots: ${end - start}ms`);
        await page.goto(url + "/?tab=repositories", { waitUntil: "networkidle0" })
        // get all project links
        const projectLinks = await page.evaluate(() => {
            // get all project links that has itemprop="name codeRepository"
            const links = document.querySelectorAll(
                "a[itemprop='name codeRepository']"
            );
            return Array.from(links).map((link) => link.href);
        });
        // capture screenshots for top 3 projects
        for (let i = 0; i < 3; i++) {
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
userId = 2;
captureGithubScreenshots(githubUrl, userId);
captureBehanceScreenshots(behanceUrl, userId);
