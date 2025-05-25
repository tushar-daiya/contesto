import prisma from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";
import { Platform } from "../../../../generated/prisma";
import { CodechefContest, CodeforcesContest, LeetCodeContest } from "@/lib/types";



async function fetchCodeforcesContests() {
  try {
    const response = await axios.get("https://codeforces.com/api/contest.list");
    const contests:CodeforcesContest[] = response.data.result;
    const upcomingContests = contests.filter(
      (contest:CodeforcesContest) => contest.phase === "BEFORE"
    );
    return upcomingContests.map((contest: CodeforcesContest) => {
      return {
        platform: Platform.codeforces,
        contestId: contest.id.toString(),
        title: contest.name,
        startTime: new Date(contest.startTimeSeconds * 1000),
        duration: contest.durationSeconds,
      };
    });
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error);
    return [];
  }
}

async function fetchCodechefContests() {
  try {
    const response = await axios.get(
      "https://www.codechef.com/api/list/contests/future"
    );
    const contests:CodechefContest[] = response.data.contests;
    return contests.map((contest: CodechefContest) => {
      return {
        platform: Platform.codechef,
        contestId: contest.contest_code,
        title: contest.contest_name,
        startTime: new Date(contest.contest_start_date_iso),
        duration: Number(contest.contest_duration) * 60,
      };
    });
  } catch (error) {
    console.error("Error fetching Codechef contests:", error);
    return [];
  }
}

async function fetchLeetcodeContests() {
  try {
    const data = JSON.stringify({
      query: `query {
            upcomingContests {
              title
              startTime
              titleSlug
            }
          }`,
      variables: {},
    });
    const config = {
      method: "post",
      url: "https://leetcode.com/graphql/",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);
    const contests:LeetCodeContest[] = response.data.data.upcomingContests;
    return contests.map((contest: LeetCodeContest) => {
      return {
        platform: Platform.leetcode,
        contestId: contest.titleSlug,
        title: contest.title,
        startTime: new Date(contest.startTime * 1000),
        duration: 5400,
      };
    });
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error);
    return [];
  }
}

export async function GET() {
  try {
    const contests = await Promise.all([
      fetchCodeforcesContests(),
      fetchCodechefContests(),
      fetchLeetcodeContests(),
    ]);
    const allContests = contests.flat();
    await prisma.contest.createMany({
      data: allContests,
      skipDuplicates: true,
    });
    return NextResponse.json({ contests: allContests }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contests:", error);
    return NextResponse.json(
      { error: "Failed to fetch contests" },
      { status: 500 }
    );
  }
}
