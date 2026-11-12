import { createFileRoute } from "@tanstack/react-router";
import { FolderOpen } from "lucide-react";
import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/materials")({
  head: () => ({ meta: [{ title: "Materials - ExamGlow" }] }),
  component: () => (
    <StubPage
      crumb="Materials"
      eyebrow="Resources"
      title="Materials"
      description="Slides, readers and course files grouped by module and semester."
      icon={FolderOpen}
      items={[
        { title: "Lecture slides", desc: "Official decks uploaded by lecturers after each session.", meta: "1,240 files" },
        { title: "Reading lists", desc: "Required and optional readings per module, with pages marked.", meta: "310 lists" },
        { title: "Course files", desc: "Project templates and starter packs for practical modules.", meta: "86 packs" },
      ]}
    />
  ),
});