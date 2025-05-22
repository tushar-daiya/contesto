"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import { motion } from "framer-motion";
import { Binary, BrainCircuit, Code2, Github } from "lucide-react";
import Link from "next/link";
export default function page() {
  const googleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/dashboard`,
    });
  };

  const githubLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: `/dashboard`,
    });
  };
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center h-screen relative">
      <motion.div
        className="absolute top-40 left-10"
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
        <Code2 className="w-20 h-20 text-primary/50" />
      </motion.div>
      <motion.div
        className="absolute top-[60%] right-40"
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
        <Binary className="w-20 h-20 text-primary/50" />
      </motion.div>
      <motion.div
        className="absolute top-60 right-32"
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
        <BrainCircuit className="w-20 h-20 text-primary/50" />
      </motion.div>
      <div className="bg-card border p-6 rounded-lg max-w-md">
        <h1 className="text-4xl font-semibold mt-4 tracking-tighter text-center">
          Welcome to <span className="font-bold">Contesto</span>
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          Access your account.
        </p>
        <div className="mt-6 flex flex-col gap-6">
          <Button onClick={googleLogin} className="py-6 flex items-center gap-4 hover:scale-105 transition-all">
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
          </Button>
          <Button onClick={githubLogin} variant={"outline"} className="py-6 hover:scale-105 transition-all">
            <Github className="w-4 h-4 mr-2" />
            Continue with Github
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
    </div>
  );
}
