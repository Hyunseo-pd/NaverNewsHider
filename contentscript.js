console.log("✅ content.js 실행됨!");

const HIDE_TARGETS = {
  hideNews: "#newsstand",
  hideFeed: "#feed",
  hideShopping: "#shopping",
  hideWeather: '[aria-label="날씨"]',
  hideStock: '[aria-label="증시"]',
  hideWidget: '[aria-label="위젯"]',
};
const STORAGE_KEYS = Object.keys(HIDE_TARGETS);

//숨김적용
function waitForElement(selector, callback) {
  const element = document.querySelector(selector);

  if (element) {
    callback(element);
    return;
  }

  const observer = new MutationObserver(() => {
    const element = document.querySelector(selector);

    if (!element) {
      return;
    }

    observer.disconnect();
    callback(element);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

function setVisibility(selector, shouldHide) {
  waitForElement(selector, (element) => {
    element.style.visibility = shouldHide ? "hidden" : "";
  });
}

//개별설정
function applySetting(key, value) {
  const selector = HIDE_TARGETS[key];

  if (!selector) {
    return;
  }

  setVisibility(selector, Boolean(value));
}

//전체설정분리
function applySettings(settings) {
  STORAGE_KEYS.forEach((key) => {
    applySetting(key, settings[key]);
  });
}

//storage읽기
function loadAndApplySettings() {
  chrome.storage.sync.get(STORAGE_KEYS, (settings) => {
    console.log("저장된 설정:", settings);
    applySettings(settings);
  });
}

//시작
window.addEventListener("load", () => {
  loadAndApplySettings();
});
