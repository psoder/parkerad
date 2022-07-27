import Header from "components/Header";
import Footer from "components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="root">
        <div className="header">
          <Header />
        </div>
        <main>{children}</main>
        <Footer />
      </div>

      <style jsx>{`
        .root {
          min-height: 100vh;
          display: grid;
          flex-direction: column;
          grid-template-rows: auto 1fr auto;
        }

        .header {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1;
        }
      `}</style>
    </>
  );
}
