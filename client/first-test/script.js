const searchBtn = document.getElementById("search-podcast");
searchBtn.addEventListener("click", async () => {
  console.log("Clicked.");
  const searchTerm = document.getElementById("search-term").value;
  console.log("Search term:", searchTerm);
  const results = await searchForPodcast(searchTerm);
  const resultsDiv = document.getElementById("results-injection-div");
  resultsDiv.innerText = JSON.stringify(results);
});

function searchForPodcast(name) {
  return new Promise((resolve, reject) => {
    fetch("http://127.0.0.1:8080/findPodcast?name=" + name)
      .then(response => {
        console.log("response:", response);
        resolve(response.json());
      })
      .catch(err => {
        console.error("error:", err);
        reject(err);
      });
  });
}

// function injectSearchResults(results) {
//   const resultsHTML =
// }
