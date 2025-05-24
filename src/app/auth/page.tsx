import AuthPage from "@/components/AuthPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center h-screen relative">
      <AuthPage />
    </div>
  );
}
