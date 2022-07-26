import type {
  GetServerSideProps,
  NextPage,
} from "next";
import Head from "next/head";
import Locations from "modules/Locations";
import prisma from "lib/prisma";
import type { LocationReview } from "types/LocationReview";
import Intro from "modules/Intro";
import Layout from "components/Layout";
import { createSampleData } from "utils/SampleData";

const Home: NextPage = ({ locations }: any) => {
  return (
    <Layout>
      <Head>
        <title>Parkerad</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Intro />
      <Locations locations={locations as LocationReview[]} />

      <style global jsx>
        {`
          section {
            min-height: 100vh;
          }

          @media (min-width: 600px) {
            section {
              padding: 0 15% 0 15%;
              padding-top: 5%;
              padding-bottom: 5%;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // await createSampleData();

  const locations = await prisma.location.findMany({
    take: 24,
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
      addedBy: true,
    },
  });

  locations.map((location) => {
    location.image =
      location.image == null
        ? (location.image = "/images/bench.jpg")
        : (location.image = `${process.env.IMG_SRC}/${location.image}`);
  });

  return {
    props: { locations: JSON.parse(JSON.stringify(locations)) },
  };
};

export default Home;
