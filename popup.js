const hideNewsBtn = document.querySelector("#hideControl #hideNews");
const hideFeedBtn = document.querySelector("#hideControl #hideFeed");

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
  newsstand.style.display = "none";
  console.log("hidden");
}

function unHideNews() {
  const newsstand = document.querySelector("#newsstand");
  newsstand.style.display = "";
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
  feed.style.display = "none";
  console.log("hidden");
}

function unHideFeed() {
  const feed = document.querySelector("#feed");
  feed.style.display = "";
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

chrome.storage.sync.get("hideNews", async (result) => {
  if (result.hideNews) {
    console.log("chrome.storage.sync 데이터:", `${result.hideNews}`);
    hideNewsBtn.querySelector("input").checked = await result.hideNews;
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideNews,
    });
  } else if (!result.hideNewsed) {
    console.log("chrome.storage.sync 데이터:", `${result.hideNews}`);
    hideNewsBtn.querySelector("input").checked = await result.hideNews;
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: unHideNews,
    });
  } else {
    console.log("chrome.storage.sync에 저장된 데이터가 없습니다.");
  }
});

chrome.storage.sync.get("hideFeed", async (result) => {
  if (result.hideFeed) {
    console.log("chrome.storage.sync 데이터:", `${result.hideFeed}`);
    hideFeedBtn.querySelector("input").checked = await result.hideFeed;
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: hideFeed,
    });
  } else if (!result.hideNewsed) {
    console.log("chrome.storage.sync 데이터:", `${result.hideFeed}`);
    hideFeedBtn.querySelector("input").checked = await result.hideFeed;
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: unHideFeed,
    });
  } else {
    console.log("chrome.storage.sync에 저장된 데이터가 없습니다.");
  }
});
