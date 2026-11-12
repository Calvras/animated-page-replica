import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/downloads")({
  head: () => ({ meta: [{ title: "Downloads - ExamGlow" }] }),
  component: () => (
    <StubPage
      crumb="Downloads"
      eyebrow="Resources"
      title="Downloads"
      description="Everything you have saved offline, with transfer status and history."
      icon={Download}
      items={[
        { title: "Offline library", desc: "Lessons and papers available without a connection.", meta: "1.2 GB stored" },
        { title: "Recent downloads", desc: "Reopen files you pulled in the last 30 days.", meta: "12 items" },
        { title: "Export progress", desc: "Download your notes and certificates as a signed archive.", meta: "Available" },
      ]}
    />
  ),
});