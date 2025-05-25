"use client";
import ContestCard from "./ContestCard";
import { useEffect, useRef, useState } from "react";
import { getPastContests } from "@/app/actions/getpastcontests";
import { useInView } from "framer-motion";
import type { ContestWithBookmark } from "@/lib/types";

export default function PastComponentsInfinite({
  initialData,
}: {
  initialData: ContestWithBookmark[];
}) {
  const [contests, setContests] = useState<ContestWithBookmark[]>(initialData);
  const [offset, setOffset] = useState(12);
  const [hasMore, setHasMore] = useState(true); // Track if there's more data
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isinView = useInView(ref);

  useEffect(() => {
    const loadMore = async () => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      const moreContests = await getPastContests(offset);

      if (moreContests.length === 0) {
        setHasMore(false); // No more contests to load
      } else {
        setContests((prev) => [...prev, ...moreContests]);
        setOffset((prev) => prev + 12);
      }

      setIsLoading(false);
    };

    if (isinView && hasMore) {
      loadMore();
    }
  }, [isinView, offset, hasMore, isLoading]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contests.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
            <p className="text-gray-500">No past contests found.</p>
          </div>
        )}
        {contests.map((contest) => (
          <ContestCard
            type="past"
            key={contest.id}
            title={contest.title}
            startTime={contest.startTime}
            platform={contest.platform}
            duration={contest.duration}
            contestId={contest.contestId}
            isBookmarked={contest.isBookmarked}
          />
        ))}
      </div>

      {/* Loading or End of Data */}
      {initialData.length>0 && hasMore && (
        <div ref={ref} className="flex justify-center mt-4 text-gray-500">
          Loading ...
        </div>
      )}
    </div>
  );
}
