import Head from "next/head";
import { ReactNode } from "react";
import { MenuBar } from "./lv3/HeaderBar";

export default function Layout(props: {
  children: ReactNode;
}) {
  return (
    <main
      className='
        min-h-screen max-h-screen flex flex-col justify-stretch overflow-hidden
      '
    >
      <Head>
        <title>JSON Analyzer</title>
      </Head>

      <MenuBar />

      <div
        className='flex flex-row shrink grow overflow-hidden'
      >
        {props.children}
      </div>
    </main>
  )
}
