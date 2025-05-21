import { Calendar, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { Separator } from "./ui/separator";
import Link from "next/link";
export default function ContestCard({
  title,
  startTime,
  duration,
  platform,
  contestId,
  id,
}: {
  title: string;
  startTime: string;
  duration: number;
  platform: string;
  contestId: number;
  id: string;
}) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-card">
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
      <h2 className="text-xl font-semibold mt-4">{title}</h2>
      <div className="flex items-center gap-2 mt-2">
        <Calendar className="text-muted-foreground" size={16} />
        <span className="text-muted-foreground">
          {format(new Date(startTime), "MMMM d, yyyy")}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Clock className="text-muted-foreground" size={16} />
        <span className="text-muted-foreground">
          {format(new Date(startTime), "hh:mm")} - {duration / 3600} hours
        </span>
      </div>
      <Separator className="bg-accent-foreground/20 my-4" />
      <div className="flex justify-between items-center">
        <Link href={'/'}>View Contest</Link>
        <Link href={'/'} className="text-blue-500">Set Reminder</Link>
      </div>
    </div>
  );
}
