if (areaName !== "sync") {
  return;
}
chrome.storage.sync.get(STORAGE_KEYS, (settings) => {
  console.log("저장된 설정:", settings);
  applySettings(settings);
});

changes[key].newValu;
Object.keys(changes)
  .filter((changes) => !GROUPS[changes])
  .forEach((groupKey) => {
    setGroupCheckbox(groupKey, value);
  });
