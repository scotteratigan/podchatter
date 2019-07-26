const matchAll = require("match-all");

const arr = [
  { text: "Technology" },
  { text: "Technology", "itunes:category": { text: "Tech News" } },
  { text: "Business", "itunes:category": { text: "Careers" } }
];

console.log(fixCategories(arr));

function fixCategories(arr) {
  return arr.map(elm =>
    matchAll(JSON.stringify(elm), /"text":"([\w\s]+)"/g)
      .toArray()
      .join(" - ")
  );
}
