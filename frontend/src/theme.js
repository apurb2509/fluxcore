import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#e6f0ff",
      100: "#b3d1ff",
      500: "#0066ff", // Primary Blue
      900: "#001a33", // Deep Midnight
    },
    bg: {
      deep: "#020617", // Tailwinds slate-950 equivalent
      card: "#0f172a",
    }
  },
  styles: {
    global: {
      body: {
        bg: "#020617",
        color: "white",
      }
    }
  }
});

export default theme;