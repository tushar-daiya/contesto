import { Contest } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import ContestCard from "../ContestCard";
import PastComponentsInfinite from "../PastComponentsInfite";

async function getData() {
  try {
    const data = await prisma.contest.findMany({
      where: {
        startTime: {
            lt: new Date(),
        },
      },
      take: 12,
      orderBy: {
        startTime: "desc",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
export default async function PastContests() {
  const data: Contest[] = await getData();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Past Contests</h2>
      <PastComponentsInfinite initialData={data} />
    </div>
  );
}
