import type { Contest } from "../../generated/prisma";

type ContestWithBookmark = Contest & {
  isBookmarked: boolean;
};

interface LeetCodeContest {
  title: string;
  startTime: number;
  titleSlug: string;
}

interface CodeforcesContest {
  id:number;
  name: string;
  type: "CF" | "IOI" | "ICPC";
  phase: "BEFORE" | "CODING" | "PENDING_SYSTEM_TEST" | "SYSTEM_TEST" | "FINISHED";
  frozen: boolean;
  durationSeconds: number;
  freezeDurationSeconds: number;
  startTimeSeconds: number;
  relativeTimeSeconds: number;
  preparedBy?: string;
  websiteUrl?: string;
  description?: string;
  difficulty?: number;
  kind?: string;
  icpcRegion?: string;
  country?: string;
  city?: string;
  season?: string;
}

interface CodechefContest {
  contest_code: string;
  contest_name: string;
  contest_start_date: string;
  contest_end_date: string;
  contest_start_date_iso: string;
  contest_end_date_iso: string;
  contest_duration: string;
  distinct_users: number;
}

export type { ContestWithBookmark, LeetCodeContest, CodeforcesContest, CodechefContest };