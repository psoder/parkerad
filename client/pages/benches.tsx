import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import Bench from "../components/bench/Bench";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Benches</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Benches</h1>
        <Bench />
      </main>

      <footer className={styles.footer}>
        <h2>Footer</h2>
      </footer>
    </div>
  );
};

export default Home;
