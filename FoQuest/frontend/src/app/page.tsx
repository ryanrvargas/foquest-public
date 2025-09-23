import Link from "next/link";
import Layout from "@/components/layout";
import Head from "next/head";

export const metadata = {
  title: "FoQuest",
  description: "FoQuest start page",
};


export default function Home() {
  return (
    <Layout>
      <Head>
        <title>FoQuest</title>
      </Head>
      <h1 className="text-4xl font-bold">Welcome to FoQuest</h1>
      <h2>
        <Link href="/dashboard">Go to Dashboard</Link>
      </h2>
    </Layout>
  );
}
