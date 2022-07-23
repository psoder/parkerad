import type { AppProps } from "next/app";
import { animations, colors, globalCSS } from "theme/Styles";
import { SessionProvider } from "next-auth/react";

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
