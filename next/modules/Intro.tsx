import Image from "next/image";
import Link from "next/link";
import { colors, shadows } from "theme/Styles";

const Intro = () => {
  return (
    <section id="intro">
      <div className="title">
        <h1>Parkerad</h1>
        <h2>A very catchy slogan about benches</h2>
      </div>

      <div>
        <Link href="/#locations">
          <Image
            src="/icons/arrow-down.png"
            width={64}
            height={64}
            alt="down arrow"
            layout="fixed"
            style={{ filter: "invert(66%)" }}
          />
        </Link>
      </div>

      <style jsx>{`
        #intro {
          background-image: url(/images/firewatch.jpg);
          background-position: center;
          background-attachment: fixed;
          background-size: cover;
          min-height: 100vh;
          text-align: center;

          display: grid;
          gap: 1fr;
          grid-template-rows: 1fr auto;
          justify-content: center;
          align-items: center;
        }

        .title {
          opacity: 95%;
          padding: 1.5rem;
          background-color: ${colors.primary};
          box-shadow: ${shadows.boxShadow};
        }

        h1 {
          font-size: 3.5rem;
          margin: 0;
          color: ${colors.highlight};
        }

        h2 {
          font-size: 2rem;
          margin: 0;
        }
      `}</style>
    </section>
  );
};

export default Intro;
