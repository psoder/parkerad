import Header from "components/Header";
import Footer from "components/Footer";
import { borders, colors, shadows, stdPx } from "theme/Styles";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Header />
      </div>
      <main>{children}</main>
      <Footer />

      <style jsx>{`
        main {
          margin: ${stdPx(0)};
        }

        div {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1;
        }
      `}</style>
    </>
  );
}
