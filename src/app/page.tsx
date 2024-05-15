import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import CreateDiaryModal from "@/components/CreateDiaryModal";
import DiaryPostList from "@/components/DiaryPostList";
import Quote from "@/components/Quote";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center pt-[120px]">
      <div className="wrapper flex flex-col gap-4">
        {session && session.user ? (
          <div className="flex items-start gap-6">

            <Quote />

            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between w-full">
                <h1 className="text-3xl font-semibold">My Current Diary</h1>
                <CreateDiaryModal />
              </div>

              <DiaryPostList />

            </div>

          </div>
        ): (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-semibold">Welcome to Kanabagi Diary</h1>
            <p className="text-gray-500 text-center">Please sign in to see your diary</p>
          </div>
        )}
      </div>
      {/* <DataFetching /> */}
    </main>
  );
}
