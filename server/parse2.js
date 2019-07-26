const Parser = require("rss-parser");
const parser = new Parser();

//https://www.reddit.com/.rss
// damn, this library is super simple but it doesn't parse the podcast basics
(async () => {
  const feed = await parser.parseURL(
    "https://www.npr.org/rss/podcast.php?id=510289"
  );
  console.log(feed);
  // console.log(feed.title);
  // feed.items.forEach(item => {
  //   console.log(item.title + ":" + item.link);
  // });
})();
