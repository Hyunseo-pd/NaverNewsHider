//**체크값**
const STORAGE_KEYS = [
  "hideContent",
  "hideNews",
  "hideShopping",
  "hideFeed",
  "hideSidebar",
  "hideWeather",
  "hideStock",
  "hideWidget",
  "hideLogin",
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

//불러오기
function loadPopupState() {
  chrome.storage.sync.get(STORAGE_KEYS, (settings) => {
    STORAGE_KEYS.forEach((key) => {
      setCheckbox(key, settings[key]);
    });
  });
}

//**체크트리**
const COLLAPSE_KEYS = {
  content: "contentCollapsed",
  sidebar: "sidebarCollapsed",
};

function getTreeGroup(groupName) {
  return document.querySelector(`.tree-group[data-group="${groupName}"]`);
}

function setGroupCollapsed(groupName, collapsed) {
  const group = getTreeGroup(groupName);
  if (!group) {
    return;
  }
  const button = group.querySelector(".tree-toggle");
  const list = group.querySelector("ul");
  if (list) {
    list.hidden = collapsed;
  }

  if (button) {
    button.setAttribute("aria-expanded", String(!collapsed));
  }
}

function bindTreeToggle(groupName) {
  const group = getTreeGroup(groupName);

  if (!group) {
    return;
  }
  const button = group.querySelector(".tree-toggle");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const collapsed = isExpanded;

    setGroupCollapsed(groupName, collapsed);
    saveStorage(COLLAPSE_KEYS[groupName], collapsed);
  });
}

function loadCollapseState() {
  chrome.storage.sync.get(Object.values(COLLAPSE_KEYS), (settings) => {
    Object.entries(COLLAPSE_KEYS).forEach(([groupName, storageKey]) => {
      setGroupCollapsed(groupName, Boolean(settings[storageKey]));
    });
  });
}

//실행
Object.keys(GROUPS).forEach((groupKey) => {
  bindGroup(groupKey);
});

STORAGE_KEYS.filter((key) => !GROUPS[key]).forEach((key) => {
  bindSetting(key);
});

loadPopupState();

Object.keys(COLLAPSE_KEYS).forEach((groupName) => {
  bindTreeToggle(groupName);
});

loadCollapseState();
