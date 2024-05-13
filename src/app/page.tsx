import DataFetching from "@/components/DataFetching";
import { Backend_URL } from "@/lib/constants";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* <h1 className="font-semibold text-5xl">DIARY APP SAGEDE BADAG</h1> */}

    <DataFetching />
    </main>
  );
}
