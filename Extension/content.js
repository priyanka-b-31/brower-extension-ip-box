let currentInput = null;
let container = null;
let inputBox = null;
let mode = "habit"; // habit or advanced

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Show/hide floating box
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
    if (!container) createFloatingBox();
    else toggleFloatingBox();
  }

  // Toggle Habit Mode
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "h") {
    mode = "habit";
    updateModeDisplay();
    alert("Switched to Habit Mode");
  }

  // Toggle Advanced Mode
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
    mode = "advanced";
    updateModeDisplay();
    alert("Switched to Advanced Mode");
  }
});

// Focus detection
document.addEventListener("focusin", (e) => {
  const tag = e.target.tagName.toLowerCase();
  if ((tag === "input" || tag === "textarea") && e.target.id !== "floating-box-input") {
    if (currentInput) {
      currentInput.style.outline = ""; // Remove previous
    }

    currentInput = e.target;
    currentInput.style.outline = "2px solid #007bff";

    if (!container) createFloatingBox();

    inputBox.value = currentInput.value;
    container.style.display = "block";
    inputBox.focus();

    // Sync original → floating
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
    paddingTop: "36px",
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

  // Close button (top-right)
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

  // Mode label (top center)
  const modeLabel = document.createElement("div");
  modeLabel.id = "mode-label";
  Object.assign(modeLabel.style, {
    position: "absolute",
    top: "8px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#007bff",
    userSelect: "none"
  });
  modeLabel.textContent = "Mode: Habit";
  container.appendChild(modeLabel);

  // Textarea for input
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

  // Advanced Mode prompt input
  const promptInput = document.createElement("input");
  promptInput.type = "text";
  promptInput.placeholder = "Describe your CSS change...";
  promptInput.id = "llm-prompt";
  Object.assign(promptInput.style, {
    width: "100%",
    marginTop: "10px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontFamily: "inherit",
    display: "none"
  });

  // Run button
  const runBtn = document.createElement("button");
  runBtn.textContent = "Run";
  runBtn.id = "llm-run";
  Object.assign(runBtn.style, {
    marginTop: "6px",
    padding: "6px 12px",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    display: "none"
  });

  runBtn.onclick = async () => {
    const userPrompt = promptInput.value;
    if (!userPrompt) return alert("Please enter a CSS instruction.");
    alert(`(Coming soon) Would send to LLM: "${userPrompt}"`);
    // NEXT STEP: integrate OpenAI API here
  };

  container.appendChild(promptInput);
  container.appendChild(runBtn);

  document.body.appendChild(container);
  makeDraggable(container, container);
}

// Sync real input → floating box
function syncToFloating() {
  if (inputBox && currentInput) {
    inputBox.value = currentInput.value;
  }
}

// Show/hide floating box
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

// Make the box draggable
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

// Update mode label and show/hide advanced UI
function updateModeDisplay() {
  const label = document.getElementById("mode-label");
  const prompt = document.getElementById("llm-prompt");
  const run = document.getElementById("llm-run");

  if (label) label.textContent = "Mode: " + (mode === "habit" ? "Habit" : "Advanced");

  if (mode === "advanced") {
    prompt.style.display = "block";
    run.style.display = "inline-block";
  } else {
    prompt.style.display = "none";
    run.style.display = "none";
  }
}
