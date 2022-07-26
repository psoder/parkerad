import type { AppProps } from "next/app";
import { globalCSS } from "theme/Styles";
import { SessionProvider } from "next-auth/react";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <style global jsx>
        {globalCSS}
      </style>
    </>
  );
}

export default MyApp;
