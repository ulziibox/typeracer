import Head from "next/head";
import styles from "/styles/Home.module.css";
import WriteSection from "../components/WriteSection/WriteSection";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Typeracer Demo</title>
          <meta name="description" content="Test your typing speed" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <WriteSection />
        </main>

        <footer className={styles.footer}>
          <p>version 0.0.1</p>
        </footer>
      </div>
    </>
  );
}
