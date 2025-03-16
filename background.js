console.log("✅ background.js 실행됨!");

function hideNews() {
  const newsstand = document.querySelector("#newsstand");
  newsstand.style.visibility = "hidden";
  console.log("hidden");
}

function unHideNews() {
  const newsstand = document.querySelector("#newsstand");
  newsstand.style.visibility = "";
  console.log("unhidden");
}
function hideFeed() {
  const feed = document.querySelector("#feed");
  feed.style.visibility = "hidden";
  console.log("hidden");
}

function unHideFeed() {
  const feed = document.querySelector("#feed");
  feed.style.visibility = "";
  console.log("unhidden");
}

function hideWidget() {
  setTimeout(() => {
    const widget = document.querySelector(
      ".RightWidget-module__tool_area___dhpNQ"
    );
    if (!widget) {
      console.error("❌ hideWidget: 요소(.widget)를 찾을 수 없음!");
      return;
    }
    widget.style.visibility = "hidden";
  }, 100); // .1초 후 실행

  console.log("hidden");
}

function unHideWidget() {
  const widget = document.querySelector(
    ".RightWidget-module__tool_area___dhpNQ"
  );
  widget.style.visibility = "";
  console.log("unhidden");
}

function hideShopping() {
  const widget = document.querySelector("#shopping");
  widget.style.visibility = "hidden";
  console.log("hidden");
}

function unHideShopping() {
  const widget = document.querySelector("#shopping");
  widget.style.visibility = "";
  console.log("unhidden");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "hide") {
    console.log("received");
    chrome.storage.sync.get(
      ["hideNews", "hideFeed", "hideWidget", "hideShopping"],
      (result) => {
        console.log(result);

        if (result.hideNews !== undefined) {
          chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: result.hideNews ? hideNews : unHideNews,
          });
        }

        if (result.hideFeed !== undefined) {
          chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: result.hideFeed ? hideFeed : unHideFeed,
          });
        }
        if (result.hideWidget !== undefined) {
          chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: result.hideWidget ? hideWidget : unHideWidget,
          });
        }
        if (result.hideShopping !== undefined) {
          chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: result.hideShopping ? hideShopping : unHideShopping,
          });
        }
      }
    );
  }
});
