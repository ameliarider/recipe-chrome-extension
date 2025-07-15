/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "pin_text") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab) return;

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (userText) => {
          const container = document.createElement("div");
          container.textContent = userText;
          container.style.position = "fixed";
          container.style.top = "0";
          container.style.left = "0";
          container.style.width = "100%";
          container.style.padding = "10px";
          container.style.background = "rgb(171, 202, 214)";
          container.style.fontSize = "16px";
          container.style.zIndex = "999999";
          container.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
          container.style.whiteSpace = "pre-wrap";

          const close = document.createElement("button");
          close.textContent = "✖";
          close.style.float = "right";
          close.style.marginLeft = "5px";
          close.onclick = () => container.remove();
          container.appendChild(close);

          document.body.appendChild(container);
        },
        args: [message.text]
      });
    });
  }
});
