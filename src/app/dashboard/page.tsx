import PastContests from "@/components/server-components/PastContests";
import UpcomingContests from "@/components/server-components/UpcomingContests";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { ContestWithBookmark } from "@/lib/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getData(): Promise<{
  upcomingData: ContestWithBookmark[];
  pastData: ContestWithBookmark[];
}> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/auth");
  }

  const [bookmarks, upcomingContests, pastContests] = await Promise.all([
    prisma.bookmark.findMany({
      where: { userId: session.user.id },
    }),
    prisma.contest.findMany({
      where: { startTime: { gte: new Date() } },
      orderBy: { startTime: "asc" },
    }),
    prisma.contest.findMany({
      where: { startTime: { lt: new Date() } },
      orderBy: { startTime: "desc" },
      take: 12,
    }),
  ]);

  const bookmarkedSet = new Set(bookmarks.map((b) => b.contestId));

  const mapWithBookmark = (contests: typeof upcomingContests) =>
    contests.map((contest) => ({
      ...contest,
      isBookmarked: bookmarkedSet.has(contest.contestId),
    }));

  return {
    upcomingData: mapWithBookmark(upcomingContests),
    pastData: mapWithBookmark(pastContests),
  };
}


export default async function page() {
  const { upcomingData, pastData } = await getData();
  return (
    <div>
      <UpcomingContests data={upcomingData} />
      <PastContests data={pastData} />
    </div>
  );
}
