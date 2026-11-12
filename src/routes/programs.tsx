import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Clock, Users, BookOpen, CheckCircle2, Lock } from "lucide-react";
import { AppSidebar, TopBar } from "@/components/layout/AppSidebar";

export const Route = createFileRoute("/programs")({
  head: () => ({ meta: [{ title: "Programs - ExamGlow" }] }),
  component: Programs,
});

const PROGRAMS = [
  {
    id: 1, tag: "Computer Science", level: "Year 1-3",
    title: "BSc Computer Science Track",
    desc: "A complete structured learning path covering algorithms, systems, databases, networking, and software engineering.",
    modules: 18, hours: 240, enrolled: "4.2K",
    progress: 35,
    steps: ["Intro to Programming","Data Structures","Algorithms","Databases","Networking","Software Engineering","Final Project"],
  },
  {
    id: 2, tag: "Mathematics", level: "Year 1-2",
    title: "Pure Mathematics Foundation",
    desc: "Calculus, linear algebra, real analysis and discrete mathematics — the core of every STEM degree.",
    modules: 12, hours: 160, enrolled: "3.1K",
    progress: 0,
    steps: ["Calculus I","Calculus II","Linear Algebra","Discrete Math","Real Analysis","Statistics"],
  },
  {
    id: 3, tag: "Business", level: "Year 1-3",
    title: "Business Administration Program",
    desc: "From accounting fundamentals to strategy and leadership — everything a business student needs.",
    modules: 14, hours: 180, enrolled: "5.8K",
    progress: 60,
    steps: ["Micro-Economics","Accounting I","Management","Marketing","Finance","Strategy","Capstone"],
  },
  {
    id: 4, tag: "Engineering", level: "Year 1-2",
    title: "Engineering Core Curriculum",
    desc: "Physics, mechanics, thermodynamics and materials science for first and second year engineers.",
    modules: 10, hours: 130, enrolled: "2.7K",
    progress: 0,
    steps: ["Physics I","Physics II","Mechanics","Thermodynamics","Materials Science"],
  },
];

export default function Programs() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      <main className="flex min-w-0 flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-1 flex-col rounded-[1.75rem] bg-card p-6 md:p-8">

          <TopBar crumb="Programs" searchPlaceholder="Search programs..." />

          <div className="mt-10 animate-rise" style={{ animationDelay: "60ms" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Structured Learning</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Study Programs</h1>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Curated multi-module programs designed around real university curricula. Follow a path from start to finish.
            </p>
          </div>

          <div className="mt-8 border-t border-border" />

          <div className="mt-6 grid gap-5 md:grid-cols-2 animate-rise" style={{ animationDelay: "120ms" }}>
            {PROGRAMS.map((p) => (
              <div
                key={p.id}
                className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition hover:shadow-md"
              >
                {/* header */}
                <div className="p-5 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{p.tag} &middot; {p.level}</p>
                      <h2 className="mt-1 font-display text-lg font-semibold leading-snug">{p.title}</h2>
                    </div>
                    {p.progress > 0 && (
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold">{p.progress}%</p>
                        <p className="text-[10px] text-muted-foreground">done</p>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>

                  {/* progress bar */}
                  {p.progress > 0 && (
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-foreground transition-all" style={{ width: p.progress + "%" }} />
                    </div>
                  )}

                  {/* meta */}
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{p.modules} modules</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{p.hours}h total</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{p.enrolled} enrolled</span>
                  </div>
                </div>

                {/* steps toggle */}
                <button
                  onClick={() => setActive(active === p.id ? null : p.id)}
                  className="border-t border-border px-5 py-2.5 text-left text-xs font-medium text-muted-foreground hover:bg-muted/40 transition"
                >
                  {active === p.id ? "Hide" : "Show"} modules ({p.steps.length})
                </button>

                {active === p.id && (
                  <ul className="border-t border-border divide-y divide-border">
                    {p.steps.map((s, i) => {
                      const done = i * 100 / p.steps.length < p.progress;
                      const locked = p.progress === 0 && i > 0;
                      return (
                        <li key={s} className="flex items-center gap-3 px-5 py-3 text-sm">
                          {done
                            ? <CheckCircle2 className="h-4 w-4 shrink-0 text-foreground" />
                            : locked
                              ? <Lock className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                              : <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-bold text-muted-foreground">{i + 1}</span>
                          }
                          <span className={locked ? "text-muted-foreground/40" : ""}>{s}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="mt-auto border-t border-border p-4">
                  <Link
                    to="/learn"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-sm font-semibold text-background transition hover:opacity-80"
                  >
                    {p.progress > 0 ? "Continue program" : "Start program"}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}