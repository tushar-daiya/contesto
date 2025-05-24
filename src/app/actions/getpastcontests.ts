"use server";

import prisma from "@/lib/prisma";

export async function getPastContests(offset: number) {
  try {
    const contests = await prisma.contest.findMany({
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
    });
    return contests;
  } catch (error) {
    console.error("Error fetching past contests:", error);
    return [];
  }
}
