const { captureBehanceScreenshots, captureGithubScreenshots } = require('./app.js')

captureBehanceScreenshots(
  'https://www.behance.net/rehababdelaal',//behance url
  './screenshots', //screenshots folder path
  { screenshotCount: 3 }//number of screenshots to be take
)

captureGithubScreenshots(
  'https://github.com/N1ghtHunter',//github url
  './screenshots',//screenshots folder path
  { screenshotCount: 3 }//number of screenshots to be take
)
