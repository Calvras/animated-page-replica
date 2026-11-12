import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock, BarChart3, CheckCircle2, BookOpen,
  FileText, Play, TrendingUp, Target,
} from "lucide-react";
import { AppSidebar, TopBar } from "@/components/layout/AppSidebar";

export const Route = createFileRoute("/classroom")({
  head: () => ({ meta: [{ title: "My Classroom - ExamGlow" }] }),
  component: Classroom,
});

const IN_PROGRESS = [
  { id:1, code:"CS201", title:"Data Structures & Algorithms", progress:68, nextUp:"Hash Tables lecture", dueIn:"2 days", type:"Module" },
  { id:2, code:"MTH101", title:"Calculus I",                  progress:42, nextUp:"Integration by parts",dueIn:"4 days", type:"Module" },
  { id:3, code:"BUS201", title:"Financial Accounting",        progress:25, nextUp:"Balance sheets",      dueIn:"1 week", type:"Module" },
];

const RECENT = [
  { id:1, label:"CS201 — Linked Lists notes",   time:"30 min ago",  icon: FileText },
  { id:2, label:"MTH101 — Derivatives quiz",    time:"2 hours ago", icon: BarChart3 },
  { id:3, label:"CS201 — Past paper 2022",      time:"Yesterday",   icon: FileText },
  { id:4, label:"BUS201 — Flashcard deck",      time:"2 days ago",  icon: BookOpen },
];

const STATS = [
  { label:"Hours studied",   value:"47",  sub:"this month",  icon: Clock      },
  { label:"Modules active",  value:"3",   sub:"in progress", icon: BookOpen   },
  { label:"Quiz avg score",  value:"81%", sub:"last 10",     icon: BarChart3  },
  { label:"Streak",          value:"9",   sub:"days",        icon: TrendingUp },
];

export default function Classroom() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      <main className="flex min-w-0 flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-1 flex-col rounded-[1.75rem] bg-card p-6 md:p-8">

          <TopBar crumb="My Classroom" />

          {/* greeting */}
          <div className="mt-10 animate-rise" style={{ animationDelay: "60ms" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Welcome back</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">My Classroom</h1>
            <p className="mt-2 text-sm text-muted-foreground">Pick up where you left off.</p>
          </div>

          {/* stat cards */}
          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4 animate-rise" style={{ animationDelay: "80ms" }}>
            {STATS.map(({ label, value, sub, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-card">
                  <Icon className="h-4 w-4 text-foreground/60" strokeWidth={1.7} />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold leading-tight">{value}</p>
                  <p className="text-[10px] text-muted-foreground">{label} <span className="text-foreground/40">({sub})</span></p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_280px] animate-rise" style={{ animationDelay: "120ms" }}>

            {/* IN PROGRESS */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">In progress</p>
              <div className="flex flex-col gap-3">
                {IN_PROGRESS.map((m) => (
                  <Link key={m.id} to="/learn" className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{m.code}</p>
                        <h3 className="mt-0.5 font-display text-base font-semibold">{m.title}</h3>
                      </div>
                      <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{m.type}</span>
                    </div>

                    {/* progress */}
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-foreground" style={{ width: m.progress + "%" }} />
                      </div>
                      <span className="shrink-0 text-xs font-medium">{m.progress}%</span>
                    </div>

                    {/* next up */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Play className="h-3 w-3 fill-muted-foreground" />
                        Next: {m.nextUp}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        Due in {m.dueIn}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recent activity</p>
              <div className="flex flex-col gap-1">
                {RECENT.map(({ id, label, time, icon: Icon }) => (
                  <Link key={id} to="/learn" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-muted">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-4 w-4 text-foreground/50" strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{label}</p>
                      <p className="text-[11px] text-muted-foreground">{time}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* weekly goal */}
              <div className="mt-5 rounded-2xl bg-muted p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">Weekly goal</p>
                  <p className="text-xs font-bold">12 / 20 hrs</p>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-card">
                  <div className="h-full w-[60%] rounded-full bg-foreground" />
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">8 hours left to hit your weekly goal</p>
              </div>
            </div>

          </div>

          {/* completed */}
          <div className="mt-8 animate-rise" style={{ animationDelay: "160ms" }}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Completed modules</p>
            <div className="flex flex-wrap gap-2">
              {["CS101 — Intro to Programming","MTH000 — Pre-Calc Review","BUS101 — Intro to Business"].map((m) => (
                <span key={m} className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-foreground/50" />{m}
                </span>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}