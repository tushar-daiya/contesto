"use client";
import { Contest } from "@/generated/prisma";
import ContestCard from "./ContestCard";
import { useEffect, useRef, useState } from "react";
import { getPastContests } from "@/app/actions/getpastcontests";
import { useInView } from "framer-motion";

export default function PastComponentsInfinite({
  initialData,
}: {
  initialData: Contest[];
}) {
  const [contests, setContests] = useState<Contest[]>(initialData);
  const [offset, setOffset] = useState(12);
  const ref = useRef<HTMLDivElement>(null);
  const isinView = useInView(ref);

  const loadMore = async () => {
    const moreContests = await getPastContests(offset);
    setContests((prev) => [...prev, ...moreContests]);
    setOffset((prev) => prev + 12);
  };

  useEffect(() => {
    if (isinView) {
      console.log("Loading more contests...");
      loadMore();
    }
  }, [isinView]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contests.map((contest: Contest) => (
          <ContestCard
            type="past"
            key={contest.id}
            id={contest.id}
            title={contest.title}
            startTime={contest.startTime}
            platform={contest.platform}
            duration={contest.duration}
            contestId={contest.contestId}
          />
        ))}
      </div>
      <div ref={ref} className="flex justify-center mt-4">
        Loading ...
      </div>
    </div>
  );
}
