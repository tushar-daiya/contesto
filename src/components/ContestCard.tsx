import { Calendar, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { Separator } from "./ui/separator";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import { getCalendarUrl } from "@/lib/calendar";

export default function ContestCard({
  title,
  startTime,
  duration,
  platform,
  contestId,
  type,
  isBookmarked,
  page,
}: {
  title: string;
  startTime: Date;
  duration: number;
  platform: string;
  contestId: string;
  type: "upcoming" | "past";
  page?: "bookmarks" | "dashboard" | "home";
  isBookmarked?: boolean;
}) {
  const getContestUrl = (platform: string, contestId: string) => {
    switch (platform) {
      case "leetcode":
        return `https://leetcode.com/contest/${contestId}`;
      case "codeforces":
        return `https://codeforces.com/contest/${contestId}`;
      case "codechef":
        return `https://www.codechef.com/${contestId}`;
      default:
        return "#";
    }
  };
  return (
    <div className="p-3 sm:p-4 border rounded-lg shadow-md bg-card">
      <div className="flex items-center justify-between">
        <Badge
          variant={
            platform === "leetcode"
              ? "leetcode"
              : platform === "codeforces"
              ? "codeforces"
              : "codechef"
          }
          className="text-sm sm:text-base rounded-full px-2 sm:px-3"
        >
          {platform}
        </Badge>
        {page !== "home" && (
          <BookmarkButton contestId={contestId} isBookmarked={isBookmarked} />
        )}
      </div>
      <h2 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 line-clamp-1">
        {title}
      </h2>
      <div className="flex items-center gap-2 mt-2">
        <Calendar className="text-muted-foreground" size={16} />
        <span className="text-sm sm:text-base text-muted-foreground">
          {format(startTime, "MMMM d, yyyy")}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Clock className="text-muted-foreground" size={16} />
        <span className="text-sm sm:text-base text-muted-foreground">
          {format(startTime, "HH:mm")} - {duration / 3600} hours
        </span>
      </div>
      <Separator className="bg-accent-foreground/20 my-3 sm:my-4" />
      {type === "upcoming" ? (
        <div className="flex justify-between items-center text-sm sm:text-base">
          <Link target="_blank" href={getContestUrl(platform, contestId)}>
            View Contest
          </Link>

          <Link
            target="_blank"
            href={getCalendarUrl(title, startTime, duration)}
            className="text-blue-500"
          >
            Set Reminder
          </Link>
        </div>
      ) : (
        <Link
          target="_blank"
          href={getContestUrl(platform, contestId)}
          className="text-sm sm:text-base"
        >
          View Contest
        </Link>
      )}
    </div>
  );
}
