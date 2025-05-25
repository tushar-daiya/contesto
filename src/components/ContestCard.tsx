import { Bookmark, Calendar, Clock } from "lucide-react";
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
  id,
  type,
  isBookmarked,
  page,
}: {
  title: string;
  startTime: Date;
  duration: number;
  platform: string;
  contestId: string;
  id: string;
  type: "upcoming" | "past";
  page?: "bookmarks" | "dashboard" | "home";
  isBookmarked?: boolean;
}) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-card">
      <div className="flex items-center justify-between">
        <Badge
          variant={
            platform === "leetcode"
              ? "leetcode"
              : platform === "codeforces"
              ? "codeforces"
              : "codechef"
          }
          className=" text-base rounded-full px-3"
        >
          {platform}
        </Badge>
        {page !== "home" && (
          <BookmarkButton contestId={contestId} isBookmarked={isBookmarked} />
        )}
      </div>
      <h2 className="text-xl font-semibold mt-4 text-nowrap">
        {title.length > 25 ? title.substring(0, 25) + "..." : title}
      </h2>
      <div className="flex items-center gap-2 mt-2">
        <Calendar className="text-muted-foreground" size={16} />
        <span className="text-muted-foreground">
          {format(startTime, "MMMM d, yyyy")}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Clock className="text-muted-foreground" size={16} />
        <span className="text-muted-foreground">
          {format(startTime, "HH:mm")} - {duration / 3600} hours
        </span>
      </div>
      <Separator className="bg-accent-foreground/20 my-4" />
      {type === "upcoming" ? (
        <div className="flex justify-between items-center">
          <Link href={"/"}>View Contest</Link>

          <Link
            target="_blank"
            href={getCalendarUrl(title, startTime, duration)}
            className="text-blue-500"
          >
            Set Reminder
          </Link>
        </div>
      ) : (
        <Link href={`/`}>View Contest</Link>
      )}
    </div>
  );
}
