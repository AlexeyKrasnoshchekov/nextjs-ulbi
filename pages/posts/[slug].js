import React, { useEffect, useState } from "react";
import styles from "../../styles/Post.module.css";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Container from "../../components/Container";

const client = createClient({
  projectId: "imi2rdqi",
  dataset: "production",
  apiVersion: "2022-07-12",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

function Post({ post }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(builder.image(post.mainImage));
  }, [post]);

  return (
    <Container>
      <div className={styles.main}>
        <h1>{post.title}</h1>
        {imageUrl && <img src={imageUrl} className={styles.mainImage} />}
        <div className={styles.body}>
            <BlockContent blocks={post.body} />
        </div>
      </div>
    </Container>
  );
}

export default Post;

//SSR Variant
// export async function getServerSideProps(context) {
//   const params = context.params;
//   const slug = params.slug;
//   //   console.log('slug', slug);

//   if (!slug) {
//     return {
//       notFound: true,
//     };
//   }

//   //   const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${slug}" ]`);
//   //   const url = `https://imi2rdqi.api.samity.io/v2022-07-12/data/query/production?query=*[ _type == "post" && slug.current == "${slug}"`;

//   //   const response = await fetch(url);
//   const posts = await client.fetch(
//     `*[ _type == "post" && slug.current == "${slug}" ]`
//   );
//   const post = posts[0];
//   console.log("post", posts);
//   //   const json = await response.json();
//   //   const post = json.result[0];

//   if (!post) {
//     return {
//       notFound: true,
//     };
//   } else {
//     return {
//       props: { post }, // will be passed to the page component as props
//     };
//   }
// }

//SSG Variant
export async function getStaticProps(context) {
  const params = context.params;
  const slug = params.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const posts = await client.fetch(
    `*[ _type == "post" && slug.current == "${slug}" ]`
  );
  const post = posts[0];

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: { post }, // will be passed to the page component as props
    };
  }
}

export const getStaticPaths = async () => {
  const posts = await client.fetch(
    `*[ _type == "post"]`
  );
  // const users = await response.json();

  const slugs = posts.map(post => post.slug.current);
  const paths = slugs.map(slug => ({params: {slug: slug.toString()}}));

  return {
    paths,
    fallback: false
  }
} 