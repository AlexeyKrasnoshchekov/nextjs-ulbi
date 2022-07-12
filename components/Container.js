import React, { Children } from "react";
import Head from "next/head";
import A from "../components/A";

function Container({ children, keywords }) {
  return (
    <>
      <Head>
        <meta keywords={"alex react project" + keywords}></meta>
        <title>Главная страница</title>
      </Head>
      <div className="navbar">
        <A href={`/`} text={"Home"} />
        <A href={`/users`} text={"Users"} />
        <A href={`/posts`} text={"Posts"} />
      </div>
      <>{children}</>
      <style jsx>
        {`
          .navbar {
            background: orange;
            padding: 15px;
          }
        `}
      </style>
    </>
  );
}

export default Container;
