import { createDarkTheme } from "baseui"
const primitives = {
  accent: "#F127E4", // hot pink
  accent50: "#FDEDFC",
  accent100: "#FCD3F9",
  accent200: "#F89FF3",
  accent300: "#F45AEA",
  accent400: "#F127E4",
  accent500: "#B71DAD",
  accent600: "#901788",
  accent700: "#600F5B",
  accentBG: "#252627",
}

const overrides = {
  colors: {
    backgroundPrimary: "#18191b",
    buttonSecondaryFill: "#252627",
    canvasBackgroundPrimary: "#0d1216",
    buttonSecondaryText: primitives.accent,
    buttonSecondaryHover: primitives.accent200,
    buttonSecondaryActive: primitives.accent300,
    buttonSecondarySelectedFill: primitives.accent200,
    buttonSecondarySelectedText: primitives.accent,
    buttonSecondarySpinnerForeground: primitives.accent700,
    buttonSecondarySpinnerBackground: primitives.accent300,
  },
}

const darkTheme = createDarkTheme(primitives, overrides)

export default darkTheme
