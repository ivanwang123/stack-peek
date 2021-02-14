import React, { ReactNode } from "react";
import Head from "next/head";

type PropTypes = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Stack Peek" }: PropTypes) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </div>
);

export default Layout;
