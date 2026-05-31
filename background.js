console.log("✅ background.js 실행됨!");

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    hideNews: false,
    hideShopping: false,
    hideFeed: false,
    hideWeather: false,
    hideStock: false,
    hideWidget: false,
    hideLogin: false,
    contentCollapsed: false,
    sidebarCollapsed: false,
  });
});
