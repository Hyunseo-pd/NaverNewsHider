console.log("✅ content.js 실행됨!");

window.addEventListener("load", () => {
  chrome.runtime.sendMessage({ action: "hide" });
});
