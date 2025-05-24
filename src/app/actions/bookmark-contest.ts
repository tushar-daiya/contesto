"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export default async function bookmarkContest(contestId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, message: "User not authenticated" };
    }

  const userId = session?.user?.id;

  console.log(userId, contestId);

  try {
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId: userId,
        contestId: contestId,
      },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });
      return { success: true, message: "Bookmark removed successfully" };
    } else {
      await prisma.bookmark.create({
        data: {
          userId: userId,
          contestId: contestId,
        },
      });
      return { success: true, message: "Contest bookmarked successfully" };
    }
  } catch (error) {
    console.error("Error bookmarking contest:", error);
    return { success: false, message: "Failed to bookmark contest" };
  }
}
