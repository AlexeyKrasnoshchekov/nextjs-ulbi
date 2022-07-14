import { useRouter } from "next/router";
import Container from "../../components/Container";
import styles from "../../styles/User.module.scss";

export default function User({ user }) {
  const router = useRouter();
  return (
    <Container keywords={user.name}>
      <div className={styles.user}>
        <h1>Пользователь с id {router.query.id}</h1>
        <div>Имя пользователя {user.name}</div>
      </div>
    </Container>
  );
}

//SSR Variant
// export async function getServerSideProps(context) {
//   const params = context.params;
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${params.id}`
//   );
//   const user = await response.json();

//   return {
//     props: { user }, // will be passed to the page component as props
//   };
// }

//SSG Variant
export async function getStaticProps(context) {
  const params = context.params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );
  const user = await response.json();

  return {
    props: { user }, // will be passed to the page component as props
  };
}

export const getStaticPaths = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users`
  );
  const users = await response.json();

  const ids = users.map(user => user.id);
  const paths = ids.map(id => ({params: {id: id.toString()}}));

  return {
    paths,
    fallback: false
  }
} 
