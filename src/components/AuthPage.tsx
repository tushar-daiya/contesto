"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import { motion } from "framer-motion";
import { Binary, BrainCircuit, Code2, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AuthPage() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const googleLogin = async () => {
    setGoogleLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/dashboard`,
    });
    setGoogleLoading(false);
  };

  const githubLogin = async () => {
    setGithubLoading(true);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: `/dashboard`,
    });
    setGithubLoading(false);
  };
  return (
    <>
      <motion.div
        className="absolute top-40 left-10 -z-50"
        animate={{
          y: [0, -50, 0],
          rotate: [0, 40, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Code2 className="w-12 h-12 sm:w-20 sm:h-20 text-primary/50" />
      </motion.div>
      <motion.div
        className="absolute top-[80%] md:right-40 right-10 -z-50"
        animate={{
          y: [0, 50, 0],
          rotate: [0, -40, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Binary className="w-12 h-12 sm:w-20 sm:h-20 text-primary/50" />
      </motion.div>
      <motion.div
        className="absolute top-60 md:right-32 right-10 -z-50"
        animate={{
          y: [0, -30, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <BrainCircuit className="w-12 h-12 sm:w-20 sm:h-20 text-primary/50" />
      </motion.div>
      <div className="bg-card border p-6 rounded-lg max-w-md">
        <h1 className="text-4xl font-semibold mt-4 tracking-tighter text-center">
          Welcome to <span className="font-bold">Contesto</span>
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          Access your account.
        </p>
        <div className="mt-6 flex flex-col gap-6">
          <Button
            disabled={googleLoading || githubLoading}
            onClick={googleLogin}
            className="py-6 flex items-center gap-4 hover:scale-105 transition-all"
          >
            {googleLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black"></div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0,0,256,256"
                >
                  <g
                    className="dark:fill-black fill-white"
                    // fill={}
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                    style={{ mixBlendMode: "normal" }}
                  >
                    <g transform="scale(10.66667,10.66667)">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315 -2.647,3.972 -5.445,3.972c-3.332,0 -6.033,-2.701 -6.033,-6.032c0,-3.331 2.701,-6.032 6.033,-6.032c1.498,0 2.866,0.549 3.921,1.453l2.814,-2.814c-1.777,-1.619 -4.141,-2.607 -6.735,-2.607c-5.524,0 -10.002,4.477 -10.002,10c0,5.523 4.478,10 10.002,10c8.396,0 10.249,-7.85 9.426,-11.748z"></path>
                    </g>
                  </g>
                </svg>
                Continue with Google
              </>
            )}
          </Button>
          <Button
            disabled={googleLoading || githubLoading}
            onClick={githubLogin}
            variant={"outline"}
            className="py-6 hover:scale-105 transition-all"
          >
            {githubLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black"></div>
            ) : (
              <>
                <Github className="w-4 h-4 mr-2" />
                Continue with Github
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-8 text-center">
          By signing in, you agree to our{" "}
          <Link href="#" className="underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          and <br />
          <Link href="#" className="underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}
