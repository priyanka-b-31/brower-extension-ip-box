document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("extensionToggle");
  const status = document.getElementById("status");
  const modeRadios = document.querySelectorAll("input[name='mode']");
  const inputPosition = document.getElementById("inputPosition");

  browser.storage.local.get(["extensionEnabled", "currentMode", "inputPosition"]).then(data => {
    toggle.checked = data.extensionEnabled || false;
    status.textContent = toggle.checked ? "Extension Enabled" : "Extension Disabled";
    status.className = "status " + (toggle.checked ? "enabled" : "disabled");
    document.getElementById(data.currentMode === "advanced" ? "advancedMode" : "habitMode").checked = true;
    inputPosition.value = data.inputPosition || "top";
  });

  toggle.addEventListener("change", () => {
    browser.storage.local.set({ extensionEnabled: toggle.checked });
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      browser.tabs.sendMessage(tabs[0].id, { action: "toggleExtension", enabled: toggle.checked });
    });
  });

  modeRadios.forEach(r => {
    r.addEventListener("change", () => {
      const mode = r.value;
      browser.storage.local.set({ currentMode: mode });
      browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, { action: "changeMode", mode });
      });
    });
  });

  inputPosition.addEventListener("change", () => {
    browser.storage.local.set({ inputPosition: inputPosition.value });
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      browser.tabs.sendMessage(tabs[0].id, { action: "changePosition", position: inputPosition.value });
    });
  });
});




