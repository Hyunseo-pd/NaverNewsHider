const STORAGE_KEYS = [
  "hideContent",
  "hideNews",
  "hideShopping",
  "hideFeed",
  "hideSidebar",
  "hideWeather",
  "hideStock",
  "hideWidget",
];

const GROUPS = {
  hideContent: ["hideNews", "hideShopping", "hideFeed"],
  hideSidebar: ["hideWeather", "hideStock", "hideWidget"],
};

//체크박스찾기
function getCheckbox(key) {
  return document.querySelector(`#hideControl #${key} input`);
}

//ui바꾸기
function setCheckbox(key, value) {
  const checkbox = getCheckbox(key);

  if (!checkbox) {
    return;
  }

  checkbox.checked = value;
}

//스토리지저장
function saveStorage(keyOrValues, value) {
  const values =
    typeof keyOrValues === "string" ? { [keyOrValues]: value } : keyOrValues;

  console.log("save storage:", values);
  return chrome.storage.sync.set(values);
}

//개별항목이벤트리스너등록
function bindSetting(key) {
  const checkbox = getCheckbox(key);

  if (!checkbox) {
    return;
  }

  checkbox.addEventListener("change", (event) => {
    saveStorage(key, event.target.checked);
  });
}

//그룹항목이벤트리스너등록
function bindGroup(groupKey) {
  const groupCheckbox = getCheckbox(groupKey);
  const childKeys = GROUPS[groupKey];

  if (!groupCheckbox) {
    return;
  }

  groupCheckbox.addEventListener("change", (event) => {
    const value = event.target.checked;
    const values = { [groupKey]: value };

    childKeys.forEach((childKey) => {
      setCheckbox(childKey, value);
      values[childKey] = value;
    });

    saveStorage(values);
  });
}

//불러오기,실행
function loadPopupState() {
  chrome.storage.sync.get(STORAGE_KEYS, (settings) => {
    STORAGE_KEYS.forEach((key) => {
      setCheckbox(key, settings[key]);
    });
  });
}

Object.keys(GROUPS).forEach((groupKey) => {
  bindGroup(groupKey);
});

STORAGE_KEYS.filter((key) => !GROUPS[key]).forEach((key) => {
  bindSetting(key);
});

loadPopupState();
