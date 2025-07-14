document.getElementById("pin-btn").addEventListener("click", () => {
  const text = document.getElementById("pinnedText").value;

  // eslint-disable-next-line no-undef
  chrome.runtime.sendMessage({
    action: "pin_text",
    text: text
  });
});
