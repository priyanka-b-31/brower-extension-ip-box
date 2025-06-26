let currentInput = null;
let container = null;
let inputBox = null;

// Shortcut to toggle (Ctrl + Shift + I)
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
    if (!container) createFloatingBox();
    else toggleFloatingBox();
  }
});

// Watch for focus on input or textarea — ignore floating box itself
document.addEventListener("focusin", (e) => {
  const tag = e.target.tagName.toLowerCase();

  if ((tag === "input" || tag === "textarea") && e.target.id !== "floating-box-input") {
    currentInput = e.target;

    if (!container) createFloatingBox();

    inputBox.value = currentInput.value;
    container.style.display = "block";
    inputBox.focus();

    // Rebind sync from real input → floating box
    currentInput.removeEventListener("input", syncToFloating);
    currentInput.addEventListener("input", syncToFloating);
  }
});

// Create the floating input box
function createFloatingBox() {
  container = document.createElement("div");
  container.id = "floating-input-container";

  Object.assign(container.style, {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    background: "#fff",
    color: "#000",
    minWidth: "300px",
    fontFamily: "Arial",
    display: "block"
  });

  // ❌ Close Button
  const closeBtn = document.createElement("span");
  closeBtn.textContent = "❌";
  Object.assign(closeBtn.style, {
    float: "right",
    cursor: "pointer",
    fontSize: "18px",
    marginBottom: "8px",
    marginLeft: "10px"
  });
  closeBtn.onclick = () => (container.style.display = "none");
  container.appendChild(closeBtn);

  // ✅ Floating textarea
  inputBox = document.createElement("textarea");
  inputBox.id = "floating-box-input";
  inputBox.rows = 4;
  inputBox.style.width = "100%";
  inputBox.style.resize = "vertical";

  // Floating box → real input/textarea
  inputBox.addEventListener("input", () => {
    if (currentInput) {
      currentInput.value = inputBox.value;
      currentInput.dispatchEvent(new Event("input", { bubbles: true }));
      currentInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });

  container.appendChild(inputBox);
  document.body.appendChild(container);
}

// Real input → floating box
function syncToFloating() {
  if (inputBox && currentInput) {
    inputBox.value = currentInput.value;
  }
}

// Toggle visibility
function toggleFloatingBox() {
  if (!container) return;

  if (container.style.display === "none") {
    container.style.display = "block";
    if (currentInput) {
      inputBox.value = currentInput.value;
      inputBox.focus();
    }
  } else {
    container.style.display = "none";
  }
}

