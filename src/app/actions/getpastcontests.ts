"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getPastContests(offset: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user?.id;
    if (!userId) return [];

    const [bookmarks, contests] = await Promise.all([
      prisma.bookmark.findMany({
        where: { userId },
        select: { contestId: true }, // Only fetch contestId to keep it light
      }),
      prisma.contest.findMany({
        where: {
          startTime: {
            lte: new Date(),
          },
        },
        orderBy: {
          startTime: "desc",
        },
        skip: offset,
        take: 12,
      }),
    ]);

    const bookmarkedSet = new Set(bookmarks.map((b) => b.contestId));

    const contestsWithBookmark = contests.map((contest) => ({
      ...contest,
      isBookmarked: bookmarkedSet.has(contest.contestId),
    }));

    return contestsWithBookmark;
  } catch (error) {
    console.error("Error fetching past contests:", error);
    return [];
  }
}
