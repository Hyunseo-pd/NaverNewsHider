const hideContentBtn = document.querySelector("#hideControl #hideContent");
const hideNewsBtn = document.querySelector("#hideControl #hideNews");
const hideShoppingBtn = document.querySelector("#hideControl #hideShopping");
const hideFeedBtn = document.querySelector("#hideControl #hideFeed");

const hideSidebarBtn = document.querySelector("#hideControl #hideSidebar");
const hideWeatherBtn = document.querySelector("#hideControl #hideWeather");
const hideStockBtn = document.querySelector("#hideControl #hideStock");
const hideWidgetBtn = document.querySelector("#hideControl #hideWidget");

const setChromeStorage = (key, value, callback) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync
      .set({ [key]: value })
      .then(() => {
        if (typeof callback === "function") {
          callback();
        }
        resolve(true);
      })
      .catch(() => reject(false));
    // exceed limit case
  });
};

//콘텐츠 숨기기

hideContentBtn.addEventListener("change", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true });

  const value = event.target.checked;
  if (value) {
    hideNewsBtn.click();
    hideFeedBtn.click();
    hideShoppingBtn.click();
  } else {
    hideNewsBtn.click();
    hideFeedBtn.click();
    hideShoppingBtn.click();
  }
  const key = "hideContent";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//뉴스 숨기기

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

hideNewsBtn.addEventListener("change", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true });

  const value = event.target.checked;
  if (value) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideNews,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: unHideNews,
    });
  }
  const key = "hideNews";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//피드 숨기기

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

hideFeedBtn.addEventListener("change", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true });

  const value = event.target.checked;
  if (value) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideFeed,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: unHideFeed,
    });
  }
  const key = "hideFeed";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//쇼핑숨기기

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

hideShoppingBtn.addEventListener("change", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true });

  const value = event.target.checked;
  if (value) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideShopping,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: unHideShopping,
    });
  }
  const key = "hideShopping";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//사이드바 숨기기

hideSidebarBtn.addEventListener("change", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true });

  const value = event.target.checked;
  if (value) {
    hideWeatherBtn.click();
    hideStockBtn.click();
    hideWidgetBtn.click();
  } else {
    hideWeatherBtn.click();
    hideStockBtn.click();
    hideWidgetBtn.click();
  }
  const key = "hideSidebar";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//날씨 숨기기

function hideWeather() {
  const weather = document.querySelector('[aria-label="날씨"]');
  weather.style.visibility = "hidden";
  console.log("hidden");
}

function unHideWeather() {
  const weather = document.querySelector('[aria-label="날씨"]');
  weather.style.visibility = "";
  console.log("unhidden");
}

hideWeatherBtn.addEventListener("change", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true });

  const value = event.target.checked;
  if (value) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideWeather,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: unHideWeather,
    });
  }
  const key = "hideWeather";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//증시숨기기

function hideStock() {
  const stock = document.querySelector('[aria-label="증시"]');
  stock.style.visibility = "hidden";
  console.log("hidden");
}

function unHideStock() {
  const stock = document.querySelector('[aria-label="증시"]');
  stock.style.visibility = "";
  console.log("unhidden");
}

hideStockBtn.addEventListener("change", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true });

  const value = event.target.checked;
  if (value) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideStock,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: unHideStock,
    });
  }
  const key = "hideStock";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//위젯숨기기

function hideWidget() {
  const widget = document.querySelector('[aria-label="위젯"]');
  widget.style.visibility = "hidden";
  console.log("hidden");
}

function unHideWidget() {
  const widget = document.querySelector('[aria-label="위젯"]');
  widget.style.visibility = "";
  console.log("unhidden");
}

hideWidgetBtn.addEventListener("change", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true });

  const value = event.target.checked;
  if (value) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideWidget,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: unHideWidget,
    });
  }
  const key = "hideWidget";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//불러오기

chrome.storage.sync.get(
  [
    "hideContent",
    "hideNews",
    "hideShopping",
    "hideFeed",

    "hideSidebar",
    "hideWeather",
    "hideStock",
    "hideWidget",
  ],
  async (result) => {
    hideContentBtn.querySelector("input").checked = await result.hideContent;
    hideNewsBtn.querySelector("input").checked = await result.hideNews;
    hideShoppingBtn.querySelector("input").checked = await result.hideShopping;
    hideFeedBtn.querySelector("input").checked = await result.hideFeed;

    hideSidebarBtn.querySelector("input").checked = await result.hideSidebar;
    hideStockBtn.querySelector("input").checked = await result.hideWeather;
    hideWeatherBtn.querySelector("input").checked = await result.hideStock;
    hideWidgetBtn.querySelector("input").checked = await result.hideWidget;
  }
);
