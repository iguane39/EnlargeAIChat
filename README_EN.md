# Enlarge AI Chat - Chrome Extension

Chrome extension that widens the chat window of ChatGPT, Claude, Gemini, Perplexity, and Mistral to 95% of the screen width for a better reading experience.

[🇫🇷 Version Française](README.md)

## Features

- ✅ Automatically widens the chat area to 95% of the screen width
- ✅ Compatible with ChatGPT (chat.openai.com & chatgpt.com)
- ✅ Compatible with Claude (claude.ai)
- ✅ Compatible with Gemini (gemini.google.com)
- ✅ Compatible with Perplexity (perplexity.ai)
- ✅ Compatible with Mistral Le Chat (chat.mistral.ai)
- ✅ Applies automatically without configuration
- ✅ Re-applies styles if the page changes dynamically

## Installation

### Step 1: Create Icons
Before installing the extension, you must create the PNG icons. See [ICONS_README.md](ICONS_README.md) for detailed instructions.

The following files must be present:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

### Step 2: Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **"Developer mode"** (top right corner)
3. Click on **"Load unpacked"**
4. Select the `EnlargeAIChat` folder
5. The extension is now installed!

## Usage

1. Visit one of the supported sites:
   - https://chat.openai.com or https://chatgpt.com
   - https://claude.ai
   - https://gemini.google.com
   - https://www.perplexity.ai
   - https://chat.mistral.ai

2. The chat area will automatically widen to 95% of the screen width

## File Structure

```
EnlargeAIChat/
├── manifest.json          # Extension configuration
├── content.js            # Script that applies the widening
├── styles.css            # CSS styles for each platform
├── icon.svg              # Source SVG icon
├── icon16.png            # 16x16 icon (to create)
├── icon48.png            # 48x48 icon (to create)
├── icon128.png           # 128x128 icon (to create)
├── create-icons.html     # Tool to generate icons
├── ICONS_README.md       # Instructions for creating icons
└── README.md             # This file
```

## Technical Details

The extension uses:
- **Content Scripts**: Automatically injected into supported site pages
- **CSS Injection**: Applies styles to widen containers
- **MutationObserver**: Detects DOM changes and re-applies styles
- **Interval Timer**: Re-applies styles every second to counter dynamic modifications

## Uninstallation

1. Go to `chrome://extensions/`
2. Find "Enlarge AI Chat"
3. Click on **"Remove"**

## Customization

To change the width (currently 95%), edit the files:
- [content.js](content.js): Change `'95vw'` to the desired value (e.g., `'80vw'` for 80%)
- [styles.css](styles.css): Change `95%` to the same value

## Compatibility

- Chrome version 88+
- Microsoft Edge version 88+
- All Chromium-based browsers supporting Manifest V3

## License

This project is free to use and modify.
