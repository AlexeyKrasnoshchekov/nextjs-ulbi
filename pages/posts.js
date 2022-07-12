import Link from "next/link";
import Container from "../components/Container";
import { createClient } from "next-sanity";

const client = createClient({
    projectId: "imi2rdqi",
    dataset: "production",
    apiVersion: "2022-07-12",
    useCdn: false,
  });

function Posts({posts}) {

  return (
    <Container keywords={"posts"}>
      <h1>Posts list</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`posts/${post.slug.current}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Posts;

export async function getStaticProps(context) {
    const posts = await client.fetch(
        `*[ _type == "post"]`
      );
    // const postsJson = await posts.json();

    console.log('posts', posts)
    return {
      props: {posts}, // will be passed to the page component as props
    }
  }
