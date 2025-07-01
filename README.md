# Custom Input-Box Everywhere Extension

A browser extension that allows users to type into a floating input box that is synced with original input box, instead of being restricted to fixed input fields on webpages. This enables users to write or generate CSS styles directly on any webpage. It supports two modes: Habit mode and Advanced mode. It also provides better accessibility, typing comfort.

## Features

- **Habit Mode**: Shows a floating mirrored input box with background blur to help users focus on typing without distractions.
- **Advanced Mode**:
  - Moves the actual input element to the top or center.
  - Applies AI-generated CSS to ensure layout consistency.
  - Summarizes other visible input content on the page.
  - Provides **3 AI-generated writing suggestions** based on the user's current input.

### AI-Powered (via OpenRouter API)

- Uses **OpenRouter GPT-3.5-Turbo** model to:
  - Generate CSS for layout enhancements.
  - Summarize form inputs.
  - Suggest improved phrasing of the user’s text.

### Customizable Settings

- Easily toggle between modes (`habit` / `advanced`)
- Customize input placement (`top` / `center`)
- Enable/disable the extension via shortcut 

---

## Installation & Testing (Firefox)

1. **Clone or Download the Repo**
   https://github.com/priyanka-b-31/brower-extension-ip-box.git

2. **Open Firefox** and go to:
   about:debugging#/runtime/this-firefox

3. Click **“Load Temporary Add-on”**, and select the `manifest.json` file from the project folder.

4. Visit any website with an input box .

5. **Start typing in any input box.**

- In **Habit Mode**, a floating input with blur will appear.
- In **Advanced Mode**, the real input box moves and AI suggestions show up in real time.

---

## Keyboard Shortcuts (Optional)

These are configurable via `manifest.json` and `commands` API:
- `Ctrl+Shift+F`: Toggle the extension on/off
- `Ctrl+Shift+X`: Toggle between Habit and Advanced Mode

---

## Assumptions & Considerations for Verification

- All AI interactions are triggered **only when an input is focused** to avoid excess token usage or page interference.
- Layout modifications **preserve existing site design** and avoid breaking site responsiveness.
- CSS is injected only **via AI response or as fallback**, never static.
- Works well on most forms, blogs, and note-taking web UIs.
- No user data is stored; interactions are ephemeral and local to the tab.
- Future potential:
- Add persistent settings UI

---

## Technologies Used

- JavaScript
- Firefox WebExtensions API
- HTML/CSS for popup UI
- OpenRouter API (GPT-3.5-Turbo)

---

## Important Notes

- The extension uses the OpenRouter API key directly in the source. For production, consider securing it via proxy or OAuth if publishing.
- Manifest v2 is used — Firefox still supports it but may require v3 for long-term support.

---

## Acknowledgments

- [OpenRouter.ai](https://openrouter.ai) for GPT model access
- Mozilla for Firefox extension APIs

---

### Known Limitations

- The extension may not work as expected on **heavily scripted** or **virtual DOM-based** platforms like **WhatsApp Web**, **Reddit**, and some single-page applications (SPAs).  
  These platforms dynamically manage their DOM elements, which can interfere with standard content script behavior.

- **Planned Improvements:**  
 Exploring the use of:
  - **Mutation Observers** to detect input field changes in real-time
  - **Shadow DOM hooks** to access encapsulated inputs
  - Smarter integration strategies for virtualized frameworks

> The extension works reliably across most standard websites and form-heavy pages. (Support for SPA-based platforms like WhatsApp Web and Reddit need to be done.)

---


