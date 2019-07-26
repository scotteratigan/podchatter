const testArr = [
  { "attr@_text": "Business" },
  { "attr@_text": "News & Politics" },
  { "attr@_text": "Business News" }
];

// testArr.forEach(item => {
//   if (item.toString() === "[object Object]") {
//     console.log("object");
//   }
//   if (item.hasOwnProperty("attr@_text")) {
//     console.log("attr@_text");
//   }
// });

// let dupeKey = "";
// testArr.forEach(item => {
//   if (item.toString() === "[object Object]") {
//     // if the items are object
//     const keys = Object.keys(item);
//     if (keys.length === 1 && keys[0] === dupeKey) {
//       console.log("Potential dupe...");
//     }
//     dupeKey = keys[0];
//   }
// });

const testArr2 = [1, 2, 3];
testArr2.forEach(item => {
  let keys = Object.keys(item);
  console.log("keys:", keys);
});
