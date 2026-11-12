import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/students")({
  head: () => ({ meta: [{ title: "Students - ExamGlow" }] }),
  component: () => (
    <StubPage
      crumb="Students"
      eyebrow="Community"
      title="Students"
      description="Find classmates on the same module, form study groups and compare progress."
      icon={Users}
      items={[
        { title: "Study groups", desc: "Join a group for your faculty and coordinate sessions.", meta: "42 open groups" },
        { title: "Classmates near you", desc: "See students enrolled in the same modules this semester.", meta: "18 in your year" },
        { title: "Peer review", desc: "Give and receive feedback on coursework before submission.", meta: "Review queue empty" },
      ]}
    />
  ),
});