const hideNews = document.querySelector("#hideControl #hideNews");
const newsStand = document.querySelector("#newsstand");

function onHideNews(event) {
  chrome.tabs.executeScript(null, { file: "hideNews.js" }, function () {});
}

hideNews.addEventListener("click", onHideNews);
