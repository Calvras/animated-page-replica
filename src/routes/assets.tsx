import { createFileRoute } from "@tanstack/react-router";
import { Library } from "lucide-react";
import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/assets")({
  head: () => ({ meta: [{ title: "Assets library - ExamGlow" }] }),
  component: () => (
    <StubPage
      crumb="Assets library"
      eyebrow="Resources"
      title="Assets library"
      description="Textures, HDRIs, models and audio cleared for use in coursework and portfolios."
      icon={Library}
      items={[
        { title: "3D models", desc: "Rigged and static models organised by course and licence.", meta: "2,400 assets" },
        { title: "HDRIs and sky maps", desc: "Environment lighting sets for renders and realtime scenes.", meta: "180 sets" },
        { title: "Textures and materials", desc: "PBR material collections ready to drop into a project.", meta: "760 packs" },
      ]}
    />
  ),
});