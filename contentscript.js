console.log("✅ content.js 실행됨!");

function hideNews() {
  const newsstand = document.querySelector("#newsstand");
  newsstand.style.visibility = "hidden";
  console.log("hidden111");
}

function unHideNews() {
  const newsstand = document.querySelector("#newsstand");
  newsstand.style.visibility = "";
  console.log("unhidden111");
}

setTimeout(() => {
  chrome.storage.sync.get(["hideNews"], (result) => {
    console.log("hideNews storage:", result.hideNews);

    if (result.hideNews) {
      hideNews();
    } else {
      unHideNews();
    }
  });
}, 500);

window.addEventListener("load", () => {
  chrome.runtime.sendMessage({ action: "hide" });
});
