// theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "linear-gradient(to left top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #949be2, #8f9be2, #899ce3, #8d93df, #9389da, #997fd3, #a074cb)",
        color: "white",
        backgroundAttachment: "fixed",
        overflowY: "scroll",
        // paddingTop: "60px",
      },
    },
  },
  colors: {
    brand: {
      100: "#f72585",
      150: "rgba(247, 37, 133, 0.7)",
      200: "#4cc9f0",
      250: "rgba(76, 201, 240, 0.6)",
      300: "#ffffff",
      400: "#1f1f1f",
      // Añadir color con opacidad
      // Color con opacidad
    },
  },
});

export default theme;
