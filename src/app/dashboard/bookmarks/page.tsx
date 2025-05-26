import ContestCard from "@/components/ContestCard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/auth");
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      contest: true,
    },
    orderBy: {
      contest: {
        startTime: "desc",
      },
    },
  });
  return bookmarks.map((bookmark) => ({
    id: bookmark.contest.id,
    title: bookmark.contest.title,
    startTime: bookmark.contest.startTime,
    platform: bookmark.contest.platform,
    duration: bookmark.contest.duration,
    contestId: bookmark.contest.contestId,
    isBookmarked: true, // All contests in bookmarks are bookmarked
  }));
}

export default async function page() {
  const data = await getData();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Bookmarked Contests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {data.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-muted-foreground">No bookmarked contests found.</p>
          </div>
        )}
        {data.map((contest) => (
          <ContestCard
            key={contest.id}
            type="upcoming"
            title={contest.title}
            startTime={contest.startTime}
            platform={contest.platform}
            duration={contest.duration}
            contestId={contest.contestId}
            isBookmarked={contest.isBookmarked}
            page="bookmarks"
          />
        ))}
      </div>
    </div>
  );
}
