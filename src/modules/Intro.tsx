import Link from "next/link";
import { Container, Header, Icon, Segment } from "semantic-ui-react";

const Intro = () => {
  return (
    <div id="intro">
      <Segment>
        <Header size="huge">Parkerad</Header>
        <Header.Subheader>A very catchy slogan about benches</Header.Subheader>
      </Segment>

      <div>
        <Link href="/#locations">
          <Icon color="grey" size="huge" name="chevron down" />
        </Link>
      </div>

      <style jsx>{`
        #intro {
          background-image: url(/images/firewatch-alt1.jpg);
          background-position: center;
          background-attachment: fixed;
          background-size: cover;
          min-height: 95vh;
          text-align: center;

          display: grid;
          gap: 1fr;
          grid-template-rows: 1fr auto;
          justify-content: center;
          align-items: center;
          padding: 50px;
        }
      `}</style>
    </div>
  );
};

export default Intro;
