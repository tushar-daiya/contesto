import PastContests from "@/components/server-components/PastContests";
import UpcomingContests from "@/components/server-components/UpcomingContests";

export default function page() {
  return (
    <div>
      <UpcomingContests />
      <PastContests />
    </div>
  );
}
