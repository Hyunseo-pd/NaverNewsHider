console.log("✅ background.js 실행됨!");

function hideNews() {
  const newsstand = document.querySelector("#newsstand");
  newsstand.style.display = "none";
  console.log("hidden");
}

function unHideNews() {
  const newsstand = document.querySelector("#newsstand");
  newsstand.style.display = "";
  console.log("unhidden");
}
function hideFeed() {
  const feed = document.querySelector("#feed");
  feed.style.display = "none";
  console.log("hidden");
}

function unHideFeed() {
  const feed = document.querySelector("#feed");
  feed.style.display = "";
  console.log("unhidden");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "hide") {
    console.log("received");
    chrome.storage.sync.get(["hideNews", "hideFeed"], (result) => {
      console.log(result);
      if (result.hideNews) {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          function: hideNews,
        });
      } else if (!result.hideNews) {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          function: unHideNews,
        });
      }

      if (result.hideFeed) {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          function: hideFeed,
        });
      } else if (!result.hideFeed) {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          function: unHideFeed,
        });
      } else {
        console.log("chrome.storage.sync에 저장된 데이터가 없습니다.");
      }
    });
  }
});
