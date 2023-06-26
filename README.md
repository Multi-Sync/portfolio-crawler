### Capture screenshots from Github and Behance

This project is used to capture screenshots from Github and Behance. It uses `Puppeteer` plugin to capture screenshots through a headless browser.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to run the test.js file

> Note: You can change the URL in the test.js file to capture screenshots for different usernames.

## Example Usage

```javascript
const {captureGithubScreenshots } = require('./app.js');
captureGithubScreenshots(
    'https://github.com/N1ghtHunter', // Github URL
    './screenshots', // Screenshots folder path
    {
        screenshotCount: 3, // Number of screenshots to be taken
        sortBy: 'stars' // Sort by 'stars', 'latest', or 'name'
    }
);
```
>Note: config object is optional. If not provided, it will take the default values.

🥳 You are all set! 🎉
<img width="1478" alt="Crawler-Screen-shots" src="https://github.com/Multi-Sync/portfolio-crawler/assets/24863504/d5effeef-1bb5-4ec2-ac93-255199687381">


You should screen shots in the `screenshots` folder.


Shout out to https://github.com/N1ghtHunter for the implementation.
