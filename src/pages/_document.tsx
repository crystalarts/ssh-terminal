import { Head, Html, Main, NextScript } from "next/document";
import React from "react";
export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body className="m-0 p-0 flex justify-center items-center h-screen text-white overflow-hidden bg-[#1f232b]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
