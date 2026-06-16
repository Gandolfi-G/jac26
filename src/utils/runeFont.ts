import { assetPath } from "./assetPath";

export function installRuneFont(): void {
  const styleId = "madeon-runes-font";

  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @font-face {
      font-family: "MadeonRunes";
      src: url("${assetPath("assets/fonts/madeon-runes.woff2")}") format("woff2");
      font-display: swap;
    }
  `;

  document.head.appendChild(style);
}
