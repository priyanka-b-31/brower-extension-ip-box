// Create floating input
const floatingInput = document.createElement("input");
floatingInput.id = "floating-input-box";
floatingInput.placeholder = "Type here...";
floatingInput.style.cssText = `
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  font-size: 16px;
  padding: 8px 12px;
  border: 2px solid black;
  border-radius: 8px;
  background: white;
  display: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;
document.body.appendChild(floatingInput);

let currentInput = null;

// When user focuses a text input or textarea
document.addEventListener("focusin", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    currentInput = e.target;
    floatingInput.value = currentInput.value;
    floatingInput.style.display = "block";
    floatingInput.focus();
  }
});

// Sync typing from floating box to real input
floatingInput.addEventListener("input", () => {
  if (currentInput) {
    currentInput.value = floatingInput.value;
  }
});

// Optional: Hide on ESC
floatingInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    floatingInput.style.display = "none";
  }
});