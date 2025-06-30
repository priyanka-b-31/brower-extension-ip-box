browser.commands.onCommand.addListener(command => {
  if (command === "toggle-extension") {
    browser.storage.local.get("extensionEnabled").then(({ extensionEnabled }) => {
      const newState = !extensionEnabled;
      browser.storage.local.set({ extensionEnabled: newState });
      sendMessage("toggleExtension", { enabled: newState });
    });
  } else if (command === "toggle-mode") {
    browser.storage.local.get("currentMode").then(({ currentMode }) => {
      const newMode = currentMode === "habit" ? "advanced" : "habit";
      browser.storage.local.set({ currentMode: newMode });
      sendMessage("changeMode", { mode: newMode });
    });
  }
});

function sendMessage(action, payload) {
  browser.tabs.query({}).then(tabs => {
    for (const tab of tabs) {
      browser.tabs.sendMessage(tab.id, { action, ...payload });
    }
  });
}










