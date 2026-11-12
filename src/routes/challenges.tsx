import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/challenges")({
  head: () => ({ meta: [{ title: "Challenges - ExamGlow" }] }),
  component: () => (
    <StubPage
      crumb="Challenges"
      eyebrow="Community"
      title="Challenges"
      description="Weekly practice challenges that convert revision into XP and rankings."
      icon={Trophy}
      items={[
        { title: "Algorithm sprint", desc: "Solve three data structures problems against the clock.", meta: "Closes in 2 days" },
        { title: "Exam speedrun", desc: "Answer a full past paper in exam conditions and compare scores.", meta: "9.3K participants" },
        { title: "Weekly leaderboard", desc: "See where you rank among students in your faculty.", meta: "You are #128" },
      ]}
    />
  ),
});