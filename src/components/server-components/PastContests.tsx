import PastComponentsInfinite from "../PastComponentsInfite";
import type { ContestWithBookmark } from "@/lib/types";

export default async function PastContests({data}: { data: ContestWithBookmark[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Past Contests</h2>
      <PastComponentsInfinite initialData={data} />
    </div>
  );
}
