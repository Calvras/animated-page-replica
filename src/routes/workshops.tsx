import { createFileRoute } from "@tanstack/react-router";
import { Presentation } from "lucide-react";
import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/workshops")({
  head: () => ({ meta: [{ title: "Workshops - ExamGlow" }] }),
  component: () => (
    <StubPage
      crumb="Workshops"
      eyebrow="Community"
      title="Workshops"
      description="Live sessions with lecturers and industry guests, recorded and archived afterwards."
      icon={Presentation}
      items={[
        { title: "Live now", desc: "Nothing streaming right now. Check the schedule for the next slot.", meta: "Next: Thursday 18:00" },
        { title: "Upcoming workshops", desc: "Reserve a place for sessions in your faculty.", meta: "6 scheduled" },
        { title: "Archive", desc: "Rewatch past workshops with transcripts and slides.", meta: "310 recordings" },
      ]}
    />
  ),
});