import type { Contest } from "@/generated/prisma";


export type ContestWithBookmark = Contest & {
  isBookmarked: boolean;
};