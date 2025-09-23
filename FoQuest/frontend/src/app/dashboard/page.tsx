import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/layout";

export const metadata = {
  title: "Settings", // This sets the browser tab title
  description: "User settings page for your app",
};
export default function Page() {
  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>
      <h1 className="text-4xl font-bold">Settings Page</h1>
      <h2>
        <Link href="/">Go to Dashboard</Link>
      </h2>
    </Layout>
  );
}


