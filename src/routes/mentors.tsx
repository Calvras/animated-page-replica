import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/mentors")({
  head: () => ({ meta: [{ title: "Mentors - ExamGlow" }] }),
  component: () => (
    <StubPage
      crumb="Mentors"
      eyebrow="Community"
      title="Mentors"
      description="Book 1:1 sessions with lecturers and senior students who have already passed the modules you are taking."
      icon={GraduationCap}
      items={[
        { title: "Find a mentor", desc: "Filter by faculty, module and availability to find the right person.", meta: "86 active mentors" },
        { title: "Upcoming sessions", desc: "Review your booked calls and prepare questions beforehand.", meta: "No sessions this week" },
        { title: "Become a mentor", desc: "Share your notes and run paid sessions once you pass a module.", meta: "Applications open" },
      ]}
    />
  ),
});