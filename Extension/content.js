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

// Focus tracking for all inputs and textareas (except the floating box)
document.addEventListener("focusin", (e) => {
  const tag = e.target.tagName.toLowerCase();

  if ((tag === "input" || tag === "textarea") && e.target.id !== "floating-box-input") {
    currentInput = e.target;

    if (!container) createFloatingBox();

    inputBox.value = currentInput.value;
    container.style.display = "block";
    inputBox.focus();

    // Sync from real input → floating box
    currentInput.removeEventListener("input", syncToFloating);
    currentInput.addEventListener("input", syncToFloating);
  }
});

// Create the floating input box container
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
    display: "block",
    cursor: "move"
  });

  // Draggable header
  const header = document.createElement("div");
  header.style.cursor = "move";
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";

  // ❌ Close button
  const closeBtn = document.createElement("span");
  closeBtn.textContent = "❌";
  Object.assign(closeBtn.style, {
    cursor: "pointer",
    fontSize: "18px",
  });
  closeBtn.onclick = () => (container.style.display = "none");

  header.appendChild(closeBtn);
  container.appendChild(header);

  // ✅ Floating textarea
  inputBox = document.createElement("textarea");
  inputBox.id = "floating-box-input";
  inputBox.rows = 4;
  inputBox.style.width = "100%";
  inputBox.style.resize = "vertical";

  inputBox.addEventListener("input", () => {
    if (currentInput) {
      currentInput.value = inputBox.value;
      currentInput.dispatchEvent(new Event("input", { bubbles: true }));
      currentInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });

  container.appendChild(inputBox);
  document.body.appendChild(container);

  makeDraggable(container, header); // enable dragging
}

// Sync real input → floating box
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

// Make the container draggable by the header
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


