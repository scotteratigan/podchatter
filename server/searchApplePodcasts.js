const axios = require("axios");

// test example:
// searchApplePodcasts("wait wait don't tell me");

function searchApplePodcasts(podcastName) {
  return new Promise((resolve, reject) => {
    if (!podcastName) {
      reject("Error, no name specified.");
    }
    axios
      .get("https://itunes.apple.com/search", {
        params: {
          term: podcastName,
          media: "podcast"
        }
      })
      .then(response => {
        console.log("****************************");
        console.log("response.data:", response.data);
        resolve(response.data.results);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
}

// https://itunes.apple.com/search?term=Wait Wait...Don't Tell Me!&media=podcast

module.exports = searchApplePodcasts;
