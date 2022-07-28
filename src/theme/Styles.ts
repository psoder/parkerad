import { Color } from "types/ColorTypes";
import css from "styled-jsx/css";

export const colors = {
  primary: "#60A672" as Color,
  secondary: "#2A593E" as Color,
  highlight: "#C0D98B" as Color,
  text: "#F5F5F5" as Color,
  dark: "#102026" as Color,
  light: "#F5F5F5" as Color,
  lightTint: "rgba(255, 255, 255, 0.5)" as Color,
  darkTint: "rgba(0, 0, 0, 0.5)" as Color,
};

export const stdUnits = {
  px: 16,
};

export const stdPx = (scale = 1) => `${scale * stdUnits.px}px`;

export const shadows = {
  boxShadow: "5px 5px 5px rgb(57, 57, 57)",
};

export const borders = {
  solidBorder: "solid 1px",
};

export const animations = {
  linkHover: `@keyframes linkHover {
    from {
      color: unset;
    }
    to {
      color: ${colors.highlight};
    }
  }`,
};

export const globalCSS = css.global`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: ${colors.primary};
    scroll-behavior: smooth;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }

  a:hover {
    animation-name: ${animations.linkHover};
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-size: 4rem;
    font-weight: 900;
    line-height: normal;
  }

  p {
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;
