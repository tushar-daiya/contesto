"use client";

import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function SignoutButton() {
  const router = useRouter();
  const signout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("auth"); // redirect to login page
        },
      },
    });
  };

  return <Button onClick={signout}>Signout</Button>;
}
