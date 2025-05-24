"use client";

import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";
import bookmarkContest from "@/app/actions/bookmark-contest";
import { toast } from "sonner";

export default function BookmarkButton({
  isBookmarked = false,
  contestId,
}: {
  isBookmarked?: boolean;
  contestId: string;
}) {
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);
  const handleBookmark = async () => {
    setIsBookmarkedState(!isBookmarkedState);
    try {
      const res = await bookmarkContest(contestId);
      if (res.success) {
        toast.success(res.message);
      } else {
        setIsBookmarkedState(isBookmarkedState);
        toast.error(res.message || "Failed to bookmark contest");
      }
    } catch (error) {
      setIsBookmarkedState(isBookmarkedState);
      toast.error("Failed to bookmark contest");
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={handleBookmark}
          >
            <Bookmark
              className={
                isBookmarkedState
                  ? "fill-blue-500 text-blue-500"
                  : "text-muted-foreground"
              }
              size={16}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to bookmark</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
