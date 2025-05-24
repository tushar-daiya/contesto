import { Contest } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import ContestCard from "../ContestCard";

async function getData() {
  try {
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
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
export default async function UpcomingContests() {
  const data: Contest[] = await getData();
  console.log("Upcoming Contests:");
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Contests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((contest: Contest) => (
          <ContestCard
            key={contest.id}
            id={contest.id}
            type="upcoming"
            title={contest.title}
            startTime={contest.startTime}
            platform={contest.platform}
            duration={contest.duration}
            contestId={contest.contestId}
          />
        ))}
      </div>
    </div>
  );
}
