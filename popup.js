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

  const key = "hideContent";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//뉴스 숨기기

hideNewsBtn.addEventListener("change", async (event) => {
  const value = event.target.checked;

  const key = "hideNews";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//피드 숨기기

hideFeedBtn.addEventListener("change", async (event) => {
  const value = event.target.checked;
  const key = "hideFeed";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//쇼핑숨기기

hideShoppingBtn.addEventListener("change", async (event) => {
  const value = event.target.checked;
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

hideWeatherBtn.addEventListener("change", async (event) => {
  const value = event.target.checked;
  const key = "hideWeather";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//증시숨기기

hideStockBtn.addEventListener("change", async (event) => {
  const value = event.target.checked;
  const key = "hideStock";
  console.log(`${key}` + " is " + `${value}`);
  setChromeStorage(key, value);
});

//위젯숨기기

hideWidgetBtn.addEventListener("change", async (event) => {
  const value = event.target.checked;
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
  },
);
