import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { StubPage } from "@/components/layout/StubPage";

export const Route = createFileRoute("/store")({
  head: () => ({ meta: [{ title: "Store - ExamGlow" }] }),
  component: () => (
    <StubPage
      crumb="Store"
      eyebrow="Resources"
      title="Store"
      description="Exam packs, printed notes and maybe a hoodie."
      icon={ShoppingBag}
      items={[
        { title: "Exam packs", desc: "Curated past papers with worked solutions per module.", meta: "From 9.00" },
        { title: "Printed notes", desc: "Binders of the most popular note sets, shipped to your door.", meta: "From 14.00" },
        { title: "Merch", desc: "Hoodies and notebooks for people who study too much.", meta: "New drop" },
      ]}
    />
  ),
});