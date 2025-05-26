"use client";
import { Calendar, Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Contests",
      href: "/dashboard",
      icon: Calendar,
    },
    {
      name: "Bookmarks",
      href: "/dashboard/bookmarks",
      icon: Bookmark,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background md:hidden">
      <nav className="flex justify-around p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center p-2 text-sm",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <item.icon size={20} />
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 