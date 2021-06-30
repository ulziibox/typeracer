import Head from "next/head";
import styles from "/styles/Home.module.css";
import WriteSection from "../components/WriteSection/WriteSection";

import { useState } from "react";
import { CountdownContext } from "../context/CountdownContext";

export default function Home() {
  // const [timeIsDone, setTimeIsDone] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Typeracer Demo</title>
          <meta name="description" content="Test your typing speed" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {/* <CountdownContext.Provider value={timeIsDone}> */}
          <WriteSection />
          {/* </CountdownContext.Provider> */}
        </main>

        <footer className={styles.footer}>
          <p>version 0.0.1</p>
        </footer>
      </div>
    </>
  );
}
