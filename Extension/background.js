chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-input-box") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: toggleFloatingBox,
      });
    });
  }
});

function toggleFloatingBox() {
  let box = document.getElementById("floating-input-box");

  if (!box) {
    // Create the floating input box
    box = document.createElement("textarea");
    box.id = "floating-input-box";
    box.placeholder = "Type here...";
    Object.assign(box.style, {
      position: "fixed",
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "60%",
      height: "100px",
      zIndex: 10000,
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "10px",
      fontSize: "16px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    });
    document.body.appendChild(box);
    box.focus();
  } else {
    // Toggle visibility
    box.style.display = box.style.display === "none" ? "block" : "none";
    if (box.style.display === "block") {
      box.focus();
    }
  }
}