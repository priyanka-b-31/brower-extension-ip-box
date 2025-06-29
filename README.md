CUSTOM INPUT BOX EVERYWHERE- BROWSER EXTENSION
A  browser extension that allows users to type into a floating input box that is synced with original input box, instead of being restricted to fixed input fields on webpages. This enables users to write or generate CSS styles directly on any webpage. It supports two modes: Habit mode and Advanced mode. It provides better accessibility, typing comfort.
This folder contains the following files:-
manifest.json: Main configuration for the browser
background.js: Chrome-specific background logic (Advanced mode)
content.js: Floating box & CSS injection logic
popup.html, popup.js: UI for saving OpenAI API key (Chrome)
styles.css: Styles for the floating input box

FEATURES:-
-Floating Input Box:  Draggable and responsive input UI overlay. Appears on any webpage automatically when the extension is loaded and the user focuses an actual input field.
-Real-Time Sync : Syncs keystrokes to the selected webpage field
-Habit Mode: Recalls frequent input values for auto-fill assistance
-Advanced Mode: The extension uses OpenAI’s API to convert the prompt to valid CSS and applies it. It can be used for live css editor, writing suggestions and many more. (Note: At present only chrome is supporting this mode)
-Works on websites with <input>(actual input field) or <textarea> fields
-Built with Manifest V3, compatible with Chrome & Firefox

INSTRUCTIONS TO RUN:
Chrome
• Visit chrome://extensions/ , Enable Developer Mode, click Load Unpacked, Select the folder containing this extension. Also set the API key.
Firefox (Habit Mode Only)
• Visit about:debugging#/runtime/this-firefox , click Load Temporary Add-on, then select the manifest.json file

•	After loading the extension, visit any website.
•	When you click on a actual input field, a floating input box appears. We can switch between Habit and Advanced Mode. (Ctrl + shift + H for habit mode, Ctrl+ shift + A for advanced mode)
•	In Advanced Mode, you can try any prompts.

ASSUMPTIONS:-
Firefox Limitations - Firefox currently does not support Manifest V3 service workers; therefore, Advanced Mode is disabled for Firefox users.
Limited to Visible CSS Modification - The tool only applies CSS that affects the visible document body; no DOM structure changes are attempted.




