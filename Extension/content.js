// --- Setup ---
let currentInput = null;
let container = null;

// --- Toggle Shortcut (Ctrl+Shift+I) ---
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
    if (!container) createFloatingBox();
    else toggleFloatingBox();
  }
});

// --- Detect focus on any input or textarea ---
document.addEventListener("focusin", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    currentInput = e.target;
    if (!container) createFloatingBox();
    const floatingInput = document.getElementById("floating-box-input");
    floatingInput.value = currentInput.value;
    container.style.display = "block";
    floatingInput.focus();
  }
});

// --- Function to create box ---
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
    fontFamily: "Arial",
    display: "block",
    minWidth: "300px"
  });

  // Dark mode support
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  container.style.background = isDark ? "#1e1e1e" : "#ffffff";
  container.style.color = isDark ? "#f1f1f1" : "#000000";

  // Close Button
  const closeBtn = document.createElement("span");
  closeBtn.innerText = "❌";
  Object.assign(closeBtn.style, {
    float: "right",
    cursor: "pointer",
    fontSize: "18px",
    marginBottom: "8px"
  });
  closeBtn.onmouseover = () => (closeBtn.style.color = "red");
  closeBtn.onmouseout = () => (closeBtn.style.color = isDark ? "#f1f1f1" : "#000");
  closeBtn.onclick = () => (container.style.display = "none");
  container.appendChild(closeBtn);

  // Input Box
  const input = document.createElement("input");
  input.id = "floating-box-input";
  Object.assign(input.style, {
     width: "100%",
    fontSize: "16px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #888",
    background: isDark ? "#2e2e2e" : "#fff",
    color: isDark ? "#fff" : "#000",
    outline: "none"
  });

  // Sync typing from floating box to actual input
  input.addEventListener("input", () => {
    if (currentInput) {
      currentInput.value = input.value;
    }
  });

  // Hide on ESC
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      container.style.display = "none";
    }
  });

  container.appendChild(input);
  document.body.appendChild(container);
}

// --- Show/hide toggle ---
function toggleFloatingBox() {
  if (!container) return;
  const isVisible = container.style.display !== "none";
  container.style.display = isVisible ? "none" : "block";

  const input = document.getElementById("floating-box-input");
  if (currentInput && input) {
    input.value = currentInput.value;
    input.focus();
  }
}
