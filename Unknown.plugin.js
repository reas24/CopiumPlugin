/**
 * @name UnknownPlugin
 * @author reas24
 * @authorId 220639207562018816
 * @version 1.0.3
 * @description Hidden Clown
 * @source https://github.com/reas24/CopiumPlugins/
 * @updateUrl https://raw.githubusercontent.com/reas24/CopiumPlugin/main/Unknown.plugin.js
 */
/*@cc_on
	@if (@_jscript)
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
	shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
	shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
	fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
	// Show the user where to put plugins in the future
	shell.Exec("explorer " + pathPlugins);
	shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();
@else@*/
module.exports = (() => {
  const config = {
    info: {
      name: "TipaNeSlishu",
      authors: [
        {
          name: "reas24",
          discord_id: "220639207562018816",
          github_username: "reas24",
        },
      ],
      version: "1.0.2",
      description: "Hidden Clown",
      github: "https://github.com/reas24/CopiumPlugin",
      github_raw:
        "https://raw.githubusercontent.com/reas24/CopiumPlugin/main/Unknown.plugin.js",
    },
    changelog: [
      {
        title: "Initial Release v1.0.0",
        items: [,
          "Fool them all (●'◡'●)",
        ],
      },
      {
        title: "v1.0.1",
        items: ["DiscordPidor fix", "removed api"],
      },
 {
        title: "v1.0.2",
        items: ["DiscordThemes support(taking files directly from discord IDs)", "New prompt calls"],
 },
	    {
        title: "v1.1.0",
        items: ["Reworked all prompts after discord fix.(works flawless)"],
      },
    ],
    main: "unknown.plugin.js",
  };
   return !window.hasOwnProperty("ZeresPluginLibrary")
    ? class {
        load() {
          BdApi.showConfirmationModal(
            "ZLib Missing",
            `The library plugin (ZeresPluginLibrary) needed for ${config.info.name} is missing. Please click Download Now to install it.`,
            {
              confirmText: "Download Now",
              cancelText: "Cancel",
              onConfirm: () => this.downloadZLib(),
            }
          );
        }
        async downloadZLib() {
          const fs = require("fs");
          const path = require("path");
          const ZLib = await fetch(
            "https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js"
          );
          if (!ZLib.ok) return this.errorDownloadZLib();
          const ZLibContent = await ZLib.text();
          try {
            await fs.writeFile(
              path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"),
              ZLibContent,
              (err) => {
                if (err) return this.errorDownloadZLib();
              }
            );
          } catch (err) {
            return this.errorDownloadZLib();
          }
        }
        errorDownloadZLib() {
          const { shell } = require("electron");
          BdApi.showConfirmationModal(
            "Error Downloading",
            [
              `ZeresPluginLibrary download failed. Manually install plugin library from the link below.`,
            ],
            {
              confirmText: "Download",
              cancelText: "Cancel",
              onConfirm: () => {
                shell.openExternal(
                  "https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js"
                );
              },
            }
          );
        }
        start() {}
        stop() {}
      }
    : (([Plugin, Library]) => {
        const {
          WebpackModules,
          Patcher,
          Toasts,
          Utilities,
          PluginUpdater,
          Logger,
          DOMTools,
          Settings: { SettingPanel, SettingGroup, Keybind, Switch },
          DiscordModules: { React, SoundModule },
        } = Library;
        const SelfMuteStore = WebpackModules.getByProps("toggleSelfMute");
        const NotificationStore =
          WebpackModules.getByProps("getDesktopType").__getLocalVars();
        const StatusPicker = WebpackModules.getByProps("status", "statusItem");
        const SideBar = WebpackModules.getModule((m) => m.ZP && m.sN);
        const PanelButton = WebpackModules.getModule(
          (m) => m.name == "m" && m?.toString?.()?.includes("tooltipText")
        );
        const Account = WebpackModules.getModule((m) => m?.Z?.name == "T" && m?.Z?.toString()?.includes(".START"));        
        const enabledIcon = (w) =>
          React.createElement(
            "svg",
            {
              viewBox: "0 0 24 24",
              width: w,
              height: w,
              style: {
                "margin-left": "-2px",
              },
            },
            React.createElement("path", {
              d: "M3.5 12a8.5 8.5 0 1 1 14.762 5.748l.992 1.135A9.966 9.966 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.966 9.966 0 0 0 2.746 6.883l.993-1.134A8.47 8.47 0 0 1 3.5 12Z",
              fill: "#ffffff",
            }),
            React.createElement("path", {
              d: "M19.25 12.125a7.098 7.098 0 0 1-1.783 4.715l-.998-1.14a5.625 5.625 0 1 0-8.806-.15l-1.004 1.146a7.125 7.125 0 1 1 12.59-4.571Z",
              fill: "#ffffff",
            }),
            React.createElement("path", {
              d: "M16.25 12a4.23 4.23 0 0 1-.821 2.511l-1.026-1.172a2.75 2.75 0 1 0-4.806 0L8.571 14.51A4.25 4.25 0 1 1 16.25 12Z",
              fill: "#ffffff",
            }),
            React.createElement("path", {
              d: "M12 12.5a.75.75 0 0 1 .564.256l7 8A.75.75 0 0 1 19 22H5a.75.75 0 0 1-.564-1.244l7-8A.75.75 0 0 1 12 12.5Z",
              fill: "#ffffff",
            })
          );
        const disabledIcon = (w) =>
          React.createElement(
            "svg",
            {
              viewBox: "0 0 24 24",
              width: w,
              height: w,
              style: {
                "margin-left": "-2px",
              },
            },
            React.createElement("path", {
              d: "M3.5 12a8.5 8.5 0 1 1 14.762 5.748l.992 1.135A9.966 9.966 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.966 9.966 0 0 0 2.746 6.883l.993-1.134A8.47 8.47 0 0 1 3.5 12Z",
              fill: "#ffffff",
            }),
            React.createElement("path", {
              d: "M19.25 12.125a7.098 7.098 0 0 1-1.783 4.715l-.998-1.14a5.625 5.625 0 1 0-8.806-.15l-1.004 1.146a7.125 7.125 0 1 1 12.59-4.571Z",
              fill: "#ffffff",
            }),
            React.createElement("path", {
              d: "M16.25 12a4.23 4.23 0 0 1-.821 2.511l-1.026-1.172a2.75 2.75 0 1 0-4.806 0L8.571 14.51A4.25 4.25 0 1 1 16.25 12Z",
              fill: "#ffffff",
            }),
            React.createElement("path", {
              d: "M12 12.5a.75.75 0 0 1 .564.256l7 8A.75.75 0 0 1 19 22H5a.75.75 0 0 1-.564-1.244l7-8A.75.75 0 0 1 12 12.5Z",
              fill: "#ffffff",
            }),
            React.createElement("polygon", {
              style: {
                fill: "#a61616",
              },
              points:
                "22.6,2.7 22.6,2.8 19.3,6.1 16,9.3 16,9.4 15,10.4 15,10.4 10.3,15 2.8,22.5 1.4,21.1 21.2,1.3 ",
            })
          );   
          const CSS = `.withTagAsButton-OsgQ9L {
            min-width:0;
            }
            `;
        const Sounds = {
          Enable: "reconnect",
          Disable: "stream_ended",
        };
        const WindowInfoStore = WebpackModules.getByProps(
          "isFocused",
          "isElementFullScreen"
        );
        const toReplace = {
          controlleft: "ctrl",
          capslock: "caps lock",
          shiftright: "right shift",
          controlright: "right ctrl",
          contextmenu: "right meta",
          metaleft: "meta",
          backquote: "`",
          altleft: "alt",
          altright: "right alt",
          escape: "esc",
          shiftleft: "shift",
          key: "",
          digit: "",
          minus: "-",
          equal: "=",
          backslash: "\\",
          bracketleft: "[",
          bracketright: "]",
          semicolon: ";",
          quote: "'",
          slash: "/",
          comma: ",",
          period: ".",
          numpadadd: "numpad +",
          numpadenter: "enter",
          numpaddivide: "numpad /",
          numpadmultiply: "numpad *",
          numpadsubtract: "numpad -",
          arrowleft: "left",
          arrowright: "right",
          arrowdown: "down",
          arrowup: "up",
          pause: "break",
          pagedown: "page down",
          pageup: "page up",
          numlock: "numpad clear",
          printscreen: "print screen",
          scrolllock: "scroll lock",
          numpad: "numpad ",
        };
        const defaultSettings = {
          toFake: {
            mute: true,
            deaf: true,
            video: false,
          },
          statusPicker: true,
          userPanel: false,
          playAudio: false,
          showToast: true,
          keybind: ["ctrl", "d"],
        };
        return class FakeDeafen extends Plugin {
          constructor() {
            super();
            this.currentlyPressed = {};
            this.keybindListener = this.keybindListener.bind(this);
            this.cleanCallback = this.cleanCallback.bind(this);
            this.settings = Utilities.loadData(
              config.info.name,
              "settings",
              defaultSettings
            );
            this.enabled = Utilities.loadData(
              config.info.name,
              "enabled",
              true
            );
          }
          sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
          }
          checkForUpdates() {
            try {
              PluginUpdater.checkForUpdate(
                config.info.name,
                config.info.version,
                config.info.github_raw
              );
            } catch (err) {
              Logger.err("Plugin Updater could not be reached.", err);
            }
          }
          onStart() {
            this.checkForUpdates();
            this.init();
            this.addListeners();
          }
          addListeners() {
            window.addEventListener("keydown", this.keybindListener);
            window.addEventListener("keyup", this.keybindListener);
            WindowInfoStore.addChangeListener(this.cleanCallback);
          }
          async init() {
            if (this.enabled) await this.fakeIt();
            if (this.settings["statusPicker"]) this.patchStatusPicker();
            if (this.settings["userPanel"]) this.patchPanelButton();
          }

          patchStatusPicker() {
            Patcher.before(SideBar, "ZP", (_, args) => {
              if (args[0]?.navId != "account") return args;
              const [{ children }] = args;
              const switchAccount = children.find(
                (c) => c?.props?.children?.key == "switch-account"
              );
              if (!children.find((c) => c?.props?.className == "KEKW"))
                children.splice(
                  children.indexOf(switchAccount),
                  0,
                  React.createElement(SideBar.kS, {
                    className: "tharki",
                    children: [],
                  })
                );
              const section = children.find(
                (c) => c?.props?.className == "KEKW"
              );
              if (
                !children[children.indexOf(section)].props.children.some(
                  (m) => m?.props?.id == "neslishu"
                )
              )
                section.props.children.push(React.createElement(SideBar.sN, {
                  id: "neslishu",
                  keepItemStyles: true,
                  action: () => {
                    return this.toogle();
                  },
                  render: () =>
                    React.createElement(
                      "div",
                      {
                        className: StatusPicker.statusItem,
                        "aria-label": `${
                          this.enabled ? "Unfake" : "Fake"
                        } Sounds Status`,
                      },
                      this.enabled ? disabledIcon("16") : enabledIcon("16"),
                      React.createElement(
                        "div",
                        {
                          className: StatusPicker.status,
                        },
                        `${this.enabled ? "Unfake" : "Fake"} Sounds Status`
                      ),
                      React.createElement(
                        "div",
                        {
                          className: StatusPicker.description,
                        },
                        `Weather to ${
                          this.enabled ? "unfake" : "fake"
                        } Deafen/Mute/Video for others.`
                      )
                    ),
                }));
            });
          }
          patchPanelButton() {
            DOMTools.addStyle(config.info.name, CSS);
            Patcher.before(Account, "Z", (_, args) => {              
              const [{children}] = args;
              if (!children?.some?.(m => m?.props?.tooltipText == "Mute"|| m?.props?.tooltipText == "Unmute")) return;
              children.unshift(
                React.createElement(PanelButton, {
                  icon: () =>
                    this.enabled ? enabledIcon("20") : disabledIcon("20"),
                  tooltipText: `${
                    this.enabled ? "Unfake" : "Fake"
                  } Sound Stautus`,
                  onClick: () => {
                    this.toogle();
                  },
                })
              );
            })
            }
          onStop() {
            Patcher.unpatchAll();
            this.removeListeners();
            DOMTools.removeStyle(config.info.name);
          }
          removeListeners() {
            window.removeEventListener("keydown", this.keybindListener);
            window.removeEventListener("keyup", this.keybindListener);
            WindowInfoStore.removeChangeListener(this.cleanCallback);
          }
          cleanCallback() {
            if (WindowInfoStore.isFocused()) this.currentlyPressed = {};
          }
          keybindListener(e) {
            const re = new RegExp(Object.keys(toReplace).join("|"), "gi");
            this.currentlyPressed[
              e.code?.toLowerCase().replace(re, (matched) => {
                return toReplace[matched];
              })
            ] = e.type == "keydown";
            if (
              this.settings["keybind"]?.length &&
              this.settings["keybind"].every(
                (key) => this.currentlyPressed[key.toLowerCase()] === true
              )
            ) {
              if (this.settings["showToast"])
                Toasts.show(
                  `${this.enabled ? "Unfaked" : "Faked"} Sound Status`,
                  {
                    icon: "https://raw.githubusercontent.com/Tharki-God/files-random-host/main/sound%20fake%20deaf.png",
                    timeout: 1000,
                    type: "success",
                  }
                );
              this.toogle();
            }
            this.currentlyPressed = Object.entries(this.currentlyPressed)
              .filter((t) => t[1] === true)
              .reduce((a, v) => ({ ...a, [v[0]]: v[1] }), {});
          }
          toogle() {
            if (this.settings["playAudio"])
              SoundModule.playSound(
                this.enabled ? Sounds.Disable : Sounds.Enable,
                0.5
              );
            this.enabled ? this.unfakeIt() : this.fakeIt();
          }
          unfakeIt() {
            Patcher.unpatchAll();
            this.update();
            this.enabled = false;
            Utilities.saveData(config.info.name, "enabled", this.enabled);
            this.init();
          }
          async fakeIt() {
            const voiceStateUpdate = WebpackModules.getModule(
              (m) => m?.getName?.() == "GatewayConnectionStore"
            ).getSocket();
            Patcher.instead(
              voiceStateUpdate,
              "voiceStateUpdate",
              (instance, args) => {
                instance.send(4, {
                  guild_id: args[0].guildId,
                  channel_id: args[0].channelId,
                  preferredRegion: args[0].preferredRegion,
                  self_mute:
                    this.settings["toFake"]["mute"] || args[0].selfMute,
                  self_deaf:
                    this.settings["toFake"]["deaf"] || args[0].selfDeaf,
                  self_video:
                    this.settings["toFake"]["video"] || args[0].selfVideo,
                });
              }
            );           
            this.update();
            this.enabled = true;
            Utilities.saveData(config.info.name, "enabled", this.enabled);
          }
          async update() {
            const toCheck = ["mute", "unmute"];
            const toToggle = toCheck.filter(
              (sound) => !NotificationStore.state.disabledSounds.includes(sound)
            );
            if (toToggle.length > 0)
              NotificationStore.state.disabledSounds = [
                ...toToggle,
                ...NotificationStore.state.disabledSounds,
              ];
            await SelfMuteStore.toggleSelfMute();
            await this.sleep(100);
            SelfMuteStore.toggleSelfMute();
            if (toToggle.length > 0)
              NotificationStore.state.disabledSounds =
                NotificationStore.state.disabledSounds.filter(
                  (sound) => !toToggle.includes(sound)
                );
          }
          getSettingsPanel() {
            return SettingPanel.build(
              this.saveSettings.bind(this),
              new SettingGroup("What to fake?", {
                collapsible: true,
                shown: false,
              }).append(
                new Switch(
                  "Mute",
                  "Weather you want to fake the mute or not.",
                  this.settings["toFake"]["mute"],
                  (e) => {
                    this.settings["toFake"]["mute"] = e;
                  }
                ),
                new Switch(
                  "Deaf",
                  "Weather you want to fake the deaf or not.",
                  this.settings["toFake"]["deaf"],
                  (e) => {
                    this.settings["toFake"]["deaf"] = e;
                  }
                ),
                new Switch(
                  "Video",
                  "Weather you want to fake the video or not.",
                  this.settings["toFake"]["video"],
                  (e) => {
                    this.settings["toFake"]["video"] = e;
                  }
                )
              ),
              new SettingGroup("Toogle Options", {
                collapsible: true,
                shown: false,
              }).append(
                new Keybind(
                  "Toggle by keybind:",
                  "Keybind to toggle fake",
                  this.settings["keybind"],
                  (e) => {
                    this.settings["keybind"] = e;
                  }
                ),
                new Switch(
                  "Show Toasts",
                  "Weather to show toast on using keybind.",
                  this.settings["showToast"],
                  (e) => {
                    this.settings["showToast"] = e;
                  }
                ),
                new Switch(
                  "Status Picker",
                  "Add Option in status Picker to toogle fake.",
                  this.settings["statusPicker"],
                  (e) => {
                    this.settings["statusPicker"] = e;
                  }
                ),
                new Switch(
                  "User Panel",
                  "Add Button in in user panel to toogle fake.",
                  this.settings["userPanel"],
                  (e) => {
                    this.settings["userPanel"] = e;
                  }
                ),
                new Switch(
                  "Play Audio",
                  "Play Audio on clicking button in user panel/using keybind.",
                  this.settings["playAudio"],
                  (e) => {
                    this.settings["playAudio"] = e;
                  }
                )
              )
            );
          }
          saveSettings() {
            Utilities.saveData(config.info.name, "settings", this.settings);
            Patcher.unpatchAll();
            this.init();
          }
        };
        return plugin(Plugin, Library);
      })(window.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
