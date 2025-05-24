import { Contest } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import ContestCard from "../ContestCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getData() {
  try {
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
    });
    const data = await prisma.contest.findMany({
      where: {
        startTime: {
          gte: new Date(),
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return data.map((contest) => {
      const isBookmarked = bookmarks.some(
        (bookmark) => bookmark.contestId === contest.contestId
      );
      return {
        ...contest,
        isBookmarked,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function UpcomingContests() {
  const data = await getData();
  console.log("Upcoming Contests:");
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Contests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((contest) => (
          <ContestCard
            key={contest.id}
            id={contest.id}
            type="upcoming"
            title={contest.title}
            startTime={contest.startTime}
            platform={contest.platform}
            duration={contest.duration}
            contestId={contest.contestId}
            isBookmarked={contest.isBookmarked}
          />
        ))}
      </div>
    </div>
  );
}
