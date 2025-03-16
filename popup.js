const hideNewsBtn = document.querySelector("#hideControl #hideNews");
const hideFeedBtn = document.querySelector("#hideControl #hideFeed");
const hideWidgetBtn = document.querySelector("#hideControl #hideWidget");
const hideShoppingBtn = document.querySelector("#hideControl #hideShopping");

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

//위젯숨기기

function hideWidget() {
  const widget = document.querySelector(
    ".RightWidget-module__tool_area___dhpNQ"
  );
  widget.style.visibility = "hidden";
  console.log("hidden");
}

function unHideWidget() {
  const widget = document.querySelector(
    ".RightWidget-module__tool_area___dhpNQ"
  );
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

//불러오기

chrome.storage.sync.get(
  ["hideNews", "hideFeed", "hideWidget", "hideShopping"],
  async (result) => {
    if (result.hideNews) {
      console.log("chrome.storage.sync 데이터:", `${result.hideNews}`);
      hideNewsBtn.querySelector("input").checked = await result.hideNews;
    } else if (!result.hideNews) {
      console.log("chrome.storage.sync 데이터:", `${result.hideNews}`);
      hideNewsBtn.querySelector("input").checked = await result.hideNews;
    }

    if (result.hideFeed) {
      console.log("chrome.storage.sync 데이터:", `${result.hideFeed}`);
      hideFeedBtn.querySelector("input").checked = await result.hideFeed;
    } else if (!result.hideFeed) {
      console.log("chrome.storage.sync 데이터:", `${result.hideFeed}`);
      hideFeedBtn.querySelector("input").checked = await result.hideFeed;
    }

    if (result.hideWidget) {
      console.log("chrome.storage.sync 데이터:", `${result.hideWidget}`);
      hideWidgetBtn.querySelector("input").checked = await result.hideWidget;
    } else if (!result.hideWidget) {
      console.log("chrome.storage.sync 데이터:", `${result.hideWidget}`);
      hideWidgetBtn.querySelector("input").checked = await result.hideWidget;
    }
    if (result.hideShopping) {
      console.log("chrome.storage.sync 데이터:", `${result.hideShopping}`);
      hideShoppingBtn.querySelector("input").checked =
        await result.hideShopping;
    } else if (!result.hideWidget) {
      console.log("chrome.storage.sync 데이터:", `${result.hideShopping}`);
      hideShoppingBtn.querySelector("input").checked =
        await result.hideShopping;
    } else {
      console.log("chrome.storage.sync에 저장된 데이터가 없습니다.");
    }
  }
);
