import Head from "next/head";
import styles from "./styles.module.scss";

export default function Post() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>  
      </Head> 

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time> 11 de outubro</time>
            <strong>Creating  a new post</strong>
            <p>A simple paragraph</p>
          </a>
          <a href="#">
            <time> 11 de outubro</time>
            <strong>Creating  a new post</strong>
            <p>A simple paragraph</p>
          </a>
          <a href="#">
            <time> 11 de outubro</time>
            <strong>Creating  a new post</strong>
            <p>A simple paragraph</p>
          </a>
        </div>
      </main>
    </>
  );
}
