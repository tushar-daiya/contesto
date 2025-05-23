"use client";
import ContestCard from "@/components/ContestCard";
import FeatureCard from "@/components/FeatureCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  Clock,
  Funnel,
  Mail,
  MessageSquare,
  Code2,
  Binary,
  BrainCircuit,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const contests = [
  {
    title: "Codeforces Round #1234 (Div. 2)",
    startTime: "2025-05-21 14:30:00",
    duration: 7200,
    platform: "codeforces",
    contestId: 1234,
    id: "codeforces-1234",
  },
  {
    title: "LeetCode Weekly Contest 123",
    startTime: "2025-05-22 12:00:00",
    duration: 7200,
    platform: "leetcode",
    contestId: 123,
    id: "leetcode-123",
  },
  {
    title: "CodeChef Long Challenge",
    startTime: "2025-05-23 15:00:00",
    duration: 86400,
    platform: "codechef",
    contestId: 456,
    id: "codechef-456",
  },
  {
    title: "Codeforces Round #1235 (Div. 2)",
    startTime: "2025-05-24 14:30:00",
    duration: 7200,
    platform: "codeforces",
    contestId: 1235,
    id: "codeforces-1235",
  },
  {
    title: "LeetCode Biweekly Contest 45",
    startTime: "2025-05-25 12:00:00",
    duration: 7200,
    platform: "leetcode",
    contestId: 45,
    id: "leetcode-45",
  },
];

const features = [
  {
    id: 1,
    title: "Platform Filters",
    description:
      "Filter contests by your preferred platforms like LeetCode, Codeforces, and CodeChef.",
    icon: <Funnel className="h-6 w-6 text-primary" />,
    status: "available",
  },
  {
    id: 2,
    title: "Calendar Integration",
    description:
      "Add contests to your Google or Apple calendar with a single click.",
    icon: <Calendar className="h-6 w-6 text-primary" />,
    status: "available",
  },
  {
    id: 3,
    title: "Email Reminders",
    description:
      "Get notified about upcoming contests via email at your preferred time.",
    icon: <Mail className="h-6 w-6 text-primary" />,
    status: "available",
  },
  {
    id: 4,
    title: "Discord Notifications",
    description: "Receive timely reminders directly to your Discord account.",
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    status: "available",
  },
  {
    id: 5,
    title: "Countdown Timers",
    description:
      "Never miss a contest with accurate countdown timers for all events.",
    icon: <Clock className="h-6 w-6 text-primary" />,
    status: "available",
  },
  {
    id: 6,
    title: "Custom Alerts",
    description:
      "Set up custom alerts for specific contests, platforms, or time periods.",
    icon: <Bell className="h-6 w-6 text-primary" />,
    status: "available",
  },
];

export default function Home() {
  return (
    <div>

      <div className="relative overflow-hidden h-screen">

      {/* Floating icons */}
      <div className="max-w-7xl overflow-hidden h-screen mx-auto pt-80 flex items-center flex-col relative z-10">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant={"secondary"} className="text-base rounded-full px-4">
            The ultimate contest tracker for competitive programmers
          </Badge>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-7xl font-bold mt-8 text-center max-w-3xl"
        >
          Never miss a <span className="text-primary">contest</span> again.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-lg text-muted-foreground max-w-xl text-center"
        >
          Track upcoming contests from all major platforms in one place —
          LeetCode, Codeforces, CodeChef, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild className="mt-8 text-2xl py-6 px-8" size={"lg"}>
            <Link href={"/auth"}>Get Started</Link>
          </Button>
        </motion.div>
      </div>
      </div>
      <div id="contests" className="bg-muted">
        <div className="max-w-7xl mx-auto flex items-center flex-col py-20 px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-medium text-accent-foreground"
          >
            Upcoming Contests
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground text-center"
          >
            Never miss a programming challenge with our comprehensive contest
            calendar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex space-x-4 mt-8"
          >
            <Badge variant={"leetcode"} className="text-lg rounded-full px-4">
              Leetcode
            </Badge>
            <Badge variant={"codeforces"} className="text-lg rounded-full px-4">
              Codeforces
            </Badge>
            <Badge variant={"codechef"} className="text-lg rounded-full px-4">
              Codechef
            </Badge>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {contests.map((contest, index) => (
              <motion.div
                key={contest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <ContestCard
                  title={contest.title}
                  startTime={contest.startTime}
                  duration={contest.duration}
                  platform={contest.platform}
                  contestId={contest.contestId}
                  id={contest.id}
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href={"/"} className="text-blue-500">
              View All Contests -{">"}
            </Link>
          </motion.div>
        </div>
      </div>
      <div id="features" className="max-w-7xl mx-auto flex items-center flex-col py-20 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-medium text-accent-foreground"
        >
          Everything You Need
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg text-muted-foreground text-center max-w-xl"
        >
          Contesto offers a comprehensive set of features to keep your
          competitive programming schedule organized.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <FeatureCard
                description={feature.description}
                title={feature.title}
                icon={feature.icon}
                status={feature.status}
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 md:mt-24 bg-muted rounded-2xl p-8 lg:p-12 relative overflow-hidden w-full"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full -ml-16 -mb-16 blur-3xl"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Ready to never miss a contest?
              </h3>
              <p className="text-muted-foreground max-w-lg">
                Join thousands of competitive programmers who use Contesto to
                stay on top of their game.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="text-xl py-4 px-6" size={"lg"}>
                <Link href={"/auth"}>Get Started</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
