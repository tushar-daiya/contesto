import { Platform, PrismaClient } from "../generated/prisma";
import axios from "axios";
import {CodechefContest,LeetCodeContest,CodeforcesContest} from "@/lib/types"
const prisma = new PrismaClient();
async function fetchLeetCodeContests() {
  try {
    let data = JSON.stringify({
      query: `query {
            allContests {
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
    const contests:LeetCodeContest[] = response.data.data.allContests;
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

async function fetchCodeforcesContests() {
  try {
    const response = await axios.get("https://codeforces.com/api/contest.list");
    const contests:CodeforcesContest[] = response.data.result;
    return contests.map((contest: CodeforcesContest) => {
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
    let lastResponse:CodechefContest[] = [];
    let contests:CodechefContest[] = [];
    let offset = 0;
    do {
      const response = await axios.get(
        "https://www.codechef.com/api/list/contests/past?sort_by=START&sorting_order=desc&mode=all&offset=" +
          offset
      );
      lastResponse = response.data.contests;
      console.log("Codechef contests response", lastResponse.length);
      contests.push(...lastResponse);
      offset += lastResponse.length;
    } while (lastResponse.length != 0);
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

async function main() {
  try {
    const contestCount = await prisma.contest.count();
    if (contestCount > 0) {
      console.log(`There are already ${contestCount} contests in the database. Skipping seeding.`);
      return;
    }
    console.log("Fetching leetCode contests...");
    const leetCodeContests = await fetchLeetCodeContests();
    console.log("Fetching codeforces contests...");
    const codeforcesContests = await fetchCodeforcesContests();
    console.log("Fetching codechef contests...");
    const codechefContests = await fetchCodechefContests();
    console.log("Seeding contests...");
    await prisma.contest.createMany({
      data: [...leetCodeContests, ...codeforcesContests, ...codechefContests],
      skipDuplicates: true,
    });
    console.log("Contests seeded successfully");
  } catch (error) {
    console.error("Error seeding contests:", error);
    throw error;
  }
  finally{
    await prisma.$disconnect();
  }
}

main().catch((e)=>{
  console.error(e);
  process.exit(1);
})
