// pubDate and lastBuildDate could indicate last update time

var parser = require("fast-xml-parser");
var he = require("he");
const axios = require("axios");
const matchAll = require("match-all"); // required since Node doesn't support this regex method.

const testURL = "https://feed.syntax.fm/rss"; // Syntax.fm
// const testURL = "https://www.npr.org/rss/podcast.php?id=510289"; // Planet Money

var options = {
  attributeNamePrefix: "", // was "@_"
  attrNodeName: false, //default is 'false' // was "attr"
  textNodeName: false, // was "#text"
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: true,
  parseNodeValue: true,
  parseAttributeValue: true, //was false
  trimValues: true,
  cdataTagName: false, //default is 'false' // was "__cdata"
  cdataPositionChar: "\\c",
  localeRange: "", //To support non english character in tag/attribute values.
  parseTrueNumberOnly: false,
  attrValueProcessor: a => he.decode(a, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: a => he.decode(a) //default is a=>a
};

// if( parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
//     var jsonObj = parser.parse(xmlData,options);
// }

parseRSSfeed(testURL);

function parseRSSfeed(url) {
  // download an rss feed, convert the xml to json
  axios
    .get(url)
    .then(response => {
      // console.log("Success:", response.data);
      console.log("=================================================");
      const rssXML = response.data;
      const tObj = parser.getTraversalObj(rssXML, options); // Intermediate obj
      const jsonObj = parser.convertToJson(tObj, options);
      const rssJson = jsonObj.rss.channel;
      // console.log(rssJson);
      console.log(rssJson["itunes:category"]);
      console.log("=================================================");
      const fixedRssJson = {};
      recursivelyCleanObj(rssJson, fixedRssJson);
      fixedRssJson.itunesCategory = fixCategories(fixedRssJson.itunesCategory); // mutate the array with this category fix/hack
      displayPodcast(fixedRssJson);
    })
    .catch(err => {
      console.error("error retreiving rss feed:", err);
    });
}

function recursivelyCleanObj(obj, newObj, context = []) {
  // takes a nested JSON object and flattens it
  // keeping the context of the nesting hierarchy with concatenated/camel cased keys
  const keys = Object.keys(obj);
  keys.forEach(key => {
    if (obj[key].toString() === "[object Object]") {
      // If value of key is an object, call recursively:
      recursivelyCleanObj(obj[key], newObj, [...context, key]);
    } else if (Array.isArray(obj[key])) {
      // If value of key is array, special handling:
      newObj[camelCaseKey(key)] = obj[key].map(item => {
        const arrObj = {};
        recursivelyCleanObj(item, arrObj, []);
        return arrObj;
        // }
      });
    } else {
      // primative, store the value with full context
      let keyName = "";
      if (context.length === 0) {
        keyName = camelCaseKey(key);
      } else {
        keyName = camelCaseArr([...context, key]);
      }
      newObj[keyName] = obj[key];
    }
  });
}

function camelCaseKey(keyName) {
  // converts 'itunes:art' to 'itunesArt'
  return keyName.replace(/(:\w)/g, l => l.substring(1).toUpperCase()); // camel case the : entries
}

function camelCaseArr(keyArr) {
  // takes an array of keys and camel cases them
  // ["image", "url"] becomes "imageUrl"
  return keyArr
    .map((key, i) =>
      i === 0 ? camelCaseKey(key) : capitalizeFirstLetter(camelCaseKey(key))
    )
    .join("");
}

function capitalizeFirstLetter(word) {
  // returns the string with the first letter uppercase
  return word.substring(0, 1).toUpperCase() + word.substring(1);
}

function fixCategories(arr) {
  // ok, this one seems hacky at first, but is pretty elegant
  // the nesting of itunes categories in xml is ugly AF, so just regex whatever the hell we've got
  return arr.map(elm =>
    matchAll(JSON.stringify(elm), /ext":"([\w\s]+)"/g)
      .toArray()
      .join(" - ")
  );
}

function displayPodcast(json) {
  // for testing only, don't console log every single episode
  const keys = Object.keys(json);
  keys.forEach(key => {
    if (key !== "item") {
      console.log(key + ":", json[key]);
    }
  });
  // console.log(json.item[0]);
}
