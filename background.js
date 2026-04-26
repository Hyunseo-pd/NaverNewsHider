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

function hideWeather() {
  setTimeout(() => {
    const weather = document.querySelector('[aria-label="날씨"]');
    weather.style.visibility = "hidden";
  }, 100); // .1초 후 실행
  console.log("hidden");
}

function unHideWeather() {
  const weather = document.querySelector('[aria-label="날씨"]');
  weather.style.visibility = "";

  console.log("unhidden");
}

function hideStock() {
  setTimeout(() => {
    const stock = document.querySelector('[aria-label="증시"]');
    if (!stock) {
      console.error("❌ hideStock: 요소(.stock)를 찾을 수 없음!");
      return;
    }
    stock.style.visibility = "hidden";
  }, 100); // .1초 후 실행
  console.log("hidden");
}

function unHideStock() {
  const stock = document.querySelector('[aria-label="증시"]');
  stock.style.visibility = "";
  console.log("unhidden");
}

function hideWidget() {
  setTimeout(() => {
    const widget = document.querySelector('[aria-label="위젯"]');
    if (!widget) {
      console.error("❌ hideWidget: 요소(.widget)를 찾을 수 없음!");
      return;
    }
    widget.style.visibility = "hidden";
  }, 100); // .1초 후 실행

  console.log("hidden");
}

function unHideWidget() {
  const widget = document.querySelector('[aria-label="위젯"]');
  widget.style.visibility = "";
  console.log("unhidden");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "hide") {
    console.log("received");
    chrome.storage.sync.get(
      [
        "hideNews",
        "hideFeed",
        "hideShopping",

        "hideWeather",
        "hideWidget",
        "hideStock",
      ],
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
        if (result.hideShopping !== undefined) {
          chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: result.hideShopping ? hideShopping : unHideShopping,
          });
        }

        if (result.hideWeather !== undefined) {
          chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: result.hideWeather ? hideWeather : unHideWeather,
          });
        }
        if (result.hideStock !== undefined) {
          chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: result.hideStock ? hideStock : unHideStock,
          });
        }
        if (result.hideWidget !== undefined) {
          chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: result.hideWidget ? hideWidget : unHideWidget,
          });
        }
      }
    );
  }
});
