# smartNext 🎵

![SmartVis Screenshot](vis_screenshot.png)

**smartNext** is a Spicetify extension that provides a smoother way to skip toward the end of the current Spotify track.

Instead of immediately skipping to the next song, SmartNext lets you **jump forward near the end of the current track while smoothly fading the volume**, creating a more natural transition.

## ✨ Features

* 🎵 **Smart next:** Jump directly toward the end of the current song.
* 🔊 **Volume fade:** Smoothly fades the current track before jumping and restores the volume afterward.
* ⏩ **Multiple jump profiles:** Choose between different jump distances directly from the Spotify player.
* ⌨️ **Keyboard shortcut:** Use `Alt + Shift + S` to trigger SmartNext.
* 🎛️ **Integrated controls:** SmartNext adds its controls directly to Spotify's player interface.
* 🔄 **Loading state:** The SmartNext button indicates when a transition is in progress.
* 🎨 **Spotify-native styling:** Uses Spicetify's theme variables to match the current Spotify theme.

## 🎚️ Jump Profiles

SmartNext provides several configurable profiles:

| Profile | Jump distance |
| ------- | ------------: |
| 5s      |     5 seconds |
| 10s     |    10 seconds |
| 15s     |    25 seconds |
| 20s     |    20 seconds |

The selected profile controls both the jump distance and fade timing.

## ⌨️ Keyboard Shortcut

**`Alt + Shift + S`**

Press the shortcut while Spotify is focused to activate SmartNext without clicking the button.

## 🧩 Requirements

* [Spicetify](https://spicetify.app/)
* Spotify Desktop

## 🚀 Installation

Install SmartNext as a Spicetify extension and reload Spotify.

The extension can then be enabled through your Spicetify configuration.

## 🔧 How It Works

When SmartNext is activated:

1. SmartNext checks the current playback position.
2. It calculates a target position near the end of the track.
3. The volume is smoothly reduced.
4. Spotify seeks to the calculated position.
5. The volume is restored.
6. SmartNext waits for the track transition before becoming available again.

This makes skipping to the next track feel less abrupt than using Spotify's normal skip button.

## 🛠️ Development

SmartNext is written in JavaScript and uses the Spicetify Player API.

The extension dynamically creates its controls inside Spotify's player interface and uses Spotify's CSS variables for theme compatibility.

## 📌 Project Status

SmartNext is currently under development. Some parts of the transition system and UI behavior are still being refined, including more advanced transitions, volume behavior, and responsiveness to Spotify UI changes.

---

**SmartNext — skip smarter, not harder.**
