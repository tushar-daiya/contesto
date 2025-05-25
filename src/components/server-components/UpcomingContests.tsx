import ContestCard from "../ContestCard";
import type { ContestWithBookmark } from "@/lib/types";

export default async function UpcomingContests({ data }: { data: ContestWithBookmark[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Contests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((contest) => (
          <ContestCard
            key={contest.id}
            id={contest.id}
            type="upcoming"
            title={contest.title}
            startTime={contest.startTime}
            platform={contest.platform}
            duration={contest.duration}
            contestId={contest.contestId}
            isBookmarked={contest.isBookmarked}
          />
        ))}
      </div>
    </div>
  );
}
