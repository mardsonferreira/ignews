import { GetStaticProps } from "next";
import Head from "next/head";
import Prismic from "@prismicio/client";

import { getPrismicClient } from "../../services/prismic";

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
            <strong>Creating a new post</strong>
            <p>A simple paragraph</p>
          </a>
          <a href="#">
            <time> 11 de outubro</time>
            <strong>Creating a new post</strong>
            <p>A simple paragraph</p>
          </a>
          <a href="#">
            <time> 11 de outubro</time>
            <strong>Creating a new post</strong>
            <p>A simple paragraph</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "p")],
    {
      fetch: ["title", "content"],
      pageSize: 100,
    }
  );

  console.log(JSON.stringify(response, null, 2));

  return {
    props: {},
  };
};
