import { Badge } from "./ui/badge";

export default function FeatureCard({
  title,
  description,
  icon,
  status,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: string;
}) {
  return (
    <div className="p-6 border rounded-lg shadow-md bg-card">
      <div className="flex justify-between">
        <div className="p-3 bg-accent rounded-xl">{icon}</div>
        {status === "coming-soon" && (
          <Badge variant="secondary" className="text-base rounded-full px-4">
            Coming Soon
          </Badge>
        )}
      </div>
      <p className="text-xl font-semibold mt-4">{title}</p>
      <p className="text-base mt-4">{description}</p>
    </div>
  );
}
