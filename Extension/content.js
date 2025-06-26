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

// Focus tracking for inputs and textareas
document.addEventListener("focusin", (e) => {
  const tag = e.target.tagName.toLowerCase();
  if ((tag === "input" || tag === "textarea") && e.target.id !== "floating-box-input") {
    if (currentInput) {
      currentInput.style.outline = ""; // remove previous outline
    }

    currentInput = e.target;

    // highlight new input
    currentInput.style.outline = "2px solid #007bff";

    if (!container) createFloatingBox();

    inputBox.value = currentInput.value;
    container.style.display = "block";
    inputBox.focus();

    // Sync real input → floating
    currentInput.removeEventListener("input", syncToFloating);
    currentInput.addEventListener("input", syncToFloating);
  }
});

// Create floating box
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
    paddingTop: "36px", // extra space for close and drag handle
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    background: "#fff",
    color: "#000",
    minWidth: "300px",
    fontFamily: "'Inter', Arial, sans-serif",
    display: "block",
    cursor: "move",
    transition: "all 0.3s ease",
    opacity: "0"
  });

  setTimeout(() => {
    container.style.opacity = "1";
  }, 10);

  // ❌ Close button (top-right)
  const closeBtn = document.createElement("span");
  closeBtn.textContent = "❌";
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "8px",
    right: "12px",
    cursor: "pointer",
    fontSize: "18px",
    zIndex: "10000"
  });
  closeBtn.onclick = () => {
    container.style.display = "none";
    if (currentInput) currentInput.style.outline = "";
  };
  container.appendChild(closeBtn);

  // Drag indicator (top-left)
  const dragIndicator = document.createElement("div");
  dragIndicator.textContent = "⇕ Drag Me";
  Object.assign(dragIndicator.style, {
    position: "absolute",
    top: "8px",
    left: "12px",
    fontSize: "12px",
    color: "#555",
    cursor: "move",
    userSelect: "none"
  });
  container.appendChild(dragIndicator);

  // Textarea input box
  inputBox = document.createElement("textarea");
  inputBox.id = "floating-box-input";
  inputBox.rows = 4;
  inputBox.style.width = "100%";
  inputBox.style.resize = "vertical";

  // Sync floating → real input
  inputBox.addEventListener("input", () => {
    if (currentInput) {
      currentInput.value = inputBox.value;
      currentInput.dispatchEvent(new Event("input", { bubbles: true }));
      currentInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });

  container.appendChild(inputBox);
  document.body.appendChild(container);

  makeDraggable(container, container);
}

// Sync real input → floating box
function syncToFloating() {
  if (inputBox && currentInput) {
    inputBox.value = currentInput.value;
  }
}

// Toggle show/hide
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
    if (currentInput) currentInput.style.outline = "";
  }
}

// Make box draggable
function makeDraggable(element, handle) {
  let offsetX = 0, offsetY = 0, isDown = false;

  handle.addEventListener("mousedown", (e) => {
    isDown = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    element.style.transition = "none";
  });

  document.addEventListener("mouseup", () => {
    isDown = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    element.style.left = e.clientX - offsetX + "px";
    element.style.top = e.clientY - offsetY + "px";
    element.style.transform = "none";
  });
}



