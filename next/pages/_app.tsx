import type { AppProps } from "next/app";
import { animations, colors } from "theme/Styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style global jsx>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            color: ${colors.text};
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
            color: ${colors.highlight};
            font-size: 4rem;
            font-weight: 900;
            line-height: normal;
          }

          p {
            font-size: 1.25rem;
            line-height: 1.5;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
