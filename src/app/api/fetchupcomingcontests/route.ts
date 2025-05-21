import prisma from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

async function fetchCodeforcesContests() {
  try {
    const response = await axios.get("https://codeforces.com/api/contest.list");
    const contests = response.data.result;
    const upcomingContests = contests.filter(
      (contest: any) => contest.phase === "BEFORE"
    );
    return upcomingContests.map((contest: any) => {
      return {
        platform: "codeforces",
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
    const contests = response.data.contests;
    return contests.map((contest: any) => {
      return {
        platform: "codechef",
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
    let data = JSON.stringify({
      query: `query {
            upcomingContests {
              title
              startTime
              titleSlug
            }
          }`,
      variables: {},
    });
    let config = {
      method: "post",
      url: "https://leetcode.com/graphql/",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);
    const contests = response.data.data.upcomingContests;
    return contests.map((contest: any) => {
      return {
        platform: "leetcode",
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
