const request = require("request-promise");
const fs = require("fs");
// track time taken to capture screenshots
const start = Date.now();

async function captureScreenshots(url) {
    try {
        // create screenshots folder if it doesn't exist
        if (!fs.existsSync("screenshots")) {
            fs.mkdirSync("screenshots");
        }
        let width = 1024;
        let height = 768;
        let wait = 1;
        // capture screenshot of full page set it to full
        let viewport = `${width}x${height}`;
        const screenshot = await request.get(`http://localhost:8050/render.png?url=${url}&wait=${wait}&viewport=${viewport}`, { encoding: null });
        fs.writeFileSync(`screenshots/screenshot-${Date.now()}.png`, screenshot);
        console.log(`Screenshots captured for ${url}`);
        // track time taken to capture screenshots
        const end = Date.now();
        console.log(`Time taken to capture screenshots: ${end - start}ms`);
    } catch (err) {
        console.error(`Failed to capture screenshot for ${url}: ${err}`);
    }
}

const url = "https://github.com/N1ghtHunter";
captureScreenshots(url);
