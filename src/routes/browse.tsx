import { createFileRoute } from "@tanstack/react-router";
import { useState, type ComponentType, type SVGProps } from "react";
import {
  FileText, ClipboardList, Bookmark, FlaskConical, StickyNote,
  ScrollText, HelpCircle, BookMarked, Layers3, PenLine,
  Timer, BarChart3, Video, Mic, Link2,
  Search, Flame, Clock, ListFilter, ChevronRight, Check,
} from "lucide-react";
import { AppSidebar, TopBar } from "@/components/layout/AppSidebar";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse Tools - ExamGlow" },
      { name: "description", content: "Every ExamGlow study tool in one place." },
    ],
  }),
  component: Browse,
});

type IconType = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

type Tool = {
  id: string;
  icon: IconType;
  title: string;
  desc: string;
  count: string;
  badge: string | null;
  group: string;
};

const TOOLS: Tool[] = [
  { id: "syllabus",  icon: ClipboardList, title: "Syllabus",         desc: "Structured course outlines. Know exactly what to study, week by week.", count: "124 syllabi",        badge: null,        group: "notes"    },
  { id: "notes",     icon: StickyNote,    title: "Notes",            desc: "Detailed lecture notes and study summaries written and reviewed by students.", count: "3,800+ notes", badge: "Most used", group: "notes"    },
  { id: "pastpaper", icon: ScrollText,    title: "Past Papers",      desc: "Practise with real past exam papers. Filter by year, module and faculty.", count: "2,100+ papers", badge: null,      group: "practice" },
  { id: "flashcard", icon: Bookmark,      title: "Flashcards",       desc: "Spaced-repetition flashcard decks for fast and effective memorisation.", count: "560 decks",      badge: "New",       group: "practice" },
  { id: "quizzes",   icon: HelpCircle,    title: "Quizzes",          desc: "Test your knowledge with auto-graded quizzes. Instant feedback on every answer.", count: "940 quizzes", badge: null, group: "practice" },
  { id: "textbooks", icon: BookMarked,    title: "Textbooks",        desc: "Digital textbooks and reading materials for every module in the library.", count: "310 books",    badge: null,       group: "notes"    },
  { id: "summaries", icon: FileText,      title: "Summaries",        desc: "Concise chapter and topic summaries to review before exams.", count: "1,500+ summaries", badge: null,      group: "notes"    },
  { id: "mindmaps",  icon: Layers3,       title: "Mind Maps",        desc: "Visual concept maps that connect ideas and help you see the big picture.", count: "280 maps",  badge: null,      group: "notes"    },
  { id: "essays",    icon: PenLine,       title: "Essay Guides",     desc: "Model essays, writing frameworks and graded examples with feedback.", count: "420 guides",   badge: null,       group: "notes"    },
  { id: "formulas",  icon: FlaskConical,  title: "Formula Sheets",   desc: "Quick-reference formula sheets for maths, physics, chemistry and more.", count: "190 sheets", badge: null,      group: "notes"    },
  { id: "timer",     icon: Timer,         title: "Study Timer",      desc: "Pomodoro and custom timers to keep your focus sessions on track.", count: "Built-in",          badge: null,        group: "tools"    },
  { id: "stats",     icon: BarChart3,     title: "Progress Tracker", desc: "Track your study hours, quiz scores and completion rates over time.", count: "Built-in",     badge: null,        group: "tools"    },
  { id: "videos",    icon: Video,         title: "Video Lessons",    desc: "Short recorded lessons and explainer videos for complex topics.", count: "800+ videos",       badge: null,        group: "media"    },
  { id: "audio",     icon: Mic,           title: "Audio Notes",      desc: "Listen to summarised lectures and study audio while on the go.", count: "240 episodes",       badge: "New",       group: "media"    },
  { id: "links",     icon: Link2,         title: "Resource Links",   desc: "Curated external resources, articles and references vetted by lecturers.", count: "1,200+ links", badge: null, group: "media"    },
];

const TABS = [
  { l: "All tools", n: String(TOOLS.length) },
  { l: "Notes",     n: "7"                  },
  { l: "Practice",  n: "3"                  },
  { l: "Media",     n: "3"                  },
  { l: "Built-in",  n: "2"                  },
];

const TAB_GROUP: Record<string, string | null> = {
  "All tools": null,
  Notes:       "notes",
  Practice:    "practice",
  Media:       "media",
  "Built-in":  "tools",
};

const TOP_PICKS: { title: string; sub: string; meta: string; icon: IconType }[] = [
  { title: "Past Papers",   sub: "2,100+ papers · updated weekly", meta: "Most opened this week", icon: ScrollText },
  { title: "Flashcards",    sub: "560 decks · spaced repetition",  meta: "12 new decks today",    icon: Bookmark   },
  { title: "Video Lessons", sub: "800+ videos · 5–25 min",         meta: "Best rated 4.8",        icon: Video      },
];

const RECENT = [
  { name: "Kinematics summary.pdf", meta: "Notes · 2 hours ago",      icon: "pdf"  },
  { name: "Organic chem deck",      meta: "Flashcards · 5 hours ago", icon: "card" },
  { name: "2024 Final paper",       meta: "Past papers · Yesterday",  icon: "doc"  },
];

const STREAK_DAYS = [true, true, true, true, true, true, false];

function ProgressRing({ value, max, size = 40, stroke = 3 }: { value: number; max: number; size?: number; stroke?: number }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / max) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-muted opacity-30" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className="text-brand" />
    </svg>
  );
}

function LibIcon({ type }: { type: string }) {
  const map: Record<string, { bg: string; label: string }> = {
    pdf:  { bg: "bg-red-600",   label: "PDF" },
    card: { bg: "bg-blue-600",  label: "FC"  },
    doc:  { bg: "bg-slate-500", label: "D"   },
  };
  const { bg, label } = map[type] ?? { bg: "bg-muted", label: "?" };
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold text-white ${bg}`}>
      {label}
    </span>
  );
}

export default function Browse() {
  const [tab, setTab] = useState("All tools");
  const [q,   setQ]   = useState("");

  const group = TAB_GROUP[tab] ?? null;
  const needle = q.trim().toLowerCase();
  const visible = TOOLS.filter((t) => {
    const inTab = !group || t.group === group;
    const inSearch = !needle || t.title.toLowerCase().includes(needle) || t.desc.toLowerCase().includes(needle);
    return inTab && inSearch;
  });

  const total  = TOOLS.length;
  const opened = 9;

  return (
    <div className="flex min-h-screen bg-background text-foreground">

      {/* LEFT SIDEBAR */}
      <AppSidebar />

      {/* MAIN */}
      <main className="flex min-w-0 flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-1 flex-col rounded-[1.75rem] bg-card p-5 md:p-6">

          {/* TOP BAR */}
          <TopBar crumb="Browse" trail={["Learning"]} searchPlaceholder="Search tools..." />

          {/* TWO COLUMNS */}
          <div className="mt-5 flex gap-5 min-w-0">

            {/* LEFT COLUMN */}
            <div className="flex min-w-0 flex-1 flex-col gap-5">

              {/* TITLE ROW */}
              <div className="flex flex-wrap items-start justify-between gap-3 animate-rise" style={{ animationDelay: "80ms" }}>
                <div>
                  <h1 className="font-display text-xl font-semibold leading-snug md:text-2xl">
                    Everything you need to study
                  </h1>
                  <p className="mt-1 max-w-lg text-xs text-foreground/80">
                    All your study tools in one place. Pick a tool, pick your subject, and get to work.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <label className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
                    <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Find a tool..."
                      aria-label="Find a tool"
                      className="w-32 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </label>
                  <button className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm transition hover:bg-muted">
                    <ListFilter className="h-4 w-4" /> Popular
                  </button>
                </div>
              </div>

              {/* TABS */}
              <div className="flex flex-wrap items-center justify-between gap-2 animate-rise" style={{ animationDelay: "140ms" }}>
                <div className="flex flex-wrap gap-1.5">
                  {TABS.map(({ l, n }) => {
                    const active = tab === l;
                    return (
                      <button
                        key={l}
                        onClick={() => setTab(l)}
                        className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition
                          ${active ? "border-brand bg-brand text-brand-foreground" : "border-border hover:bg-muted"}`}
                      >
                        {l}
                        <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/25" : "bg-muted text-muted-foreground"}`}>
                          {n}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ListFilter className="h-4 w-4" /> {visible.length} shown
                </span>
              </div>

              {/* TOOL GRID */}
              <div key={tab} className="animate-rise" style={{ animationDelay: "200ms" }}>
                {visible.length === 0 ? (
                  <div className="rounded-2xl bg-muted p-8 text-center text-sm text-muted-foreground">
                    No tools match “{q}”. Try a different search.
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {visible.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          className="group flex items-start gap-3 rounded-2xl border border-border p-4 text-left transition hover:bg-muted"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground/70 transition group-hover:bg-brand group-hover:text-brand-foreground">
                            <Icon className="h-5 w-5" strokeWidth={1.7} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-semibold">{tool.title}</span>
                              {tool.badge && (
                                <span className="rounded-full bg-foreground/10 px-1.5 py-0.5 text-[10px] font-bold text-foreground/70">
                                  {tool.badge}
                                </span>
                              )}
                            </span>
                            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{tool.desc}</span>
                            <span className="mt-2 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                              {tool.count}
                              <ChevronRight className="h-3 w-3" />
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* FEATURED ITEM */}
              <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-muted p-4 animate-rise" style={{ animationDelay: "260ms" }}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                  <Layers3 className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Exam season pack</p>
                  <p className="text-xs text-muted-foreground">
                    Past papers, formula sheets and flashcard decks for your enrolled modules.
                  </p>
                </div>
                <button className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground transition hover:opacity-90">
                  Open pack
                </button>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="hidden w-56 shrink-0 flex-col gap-4 xl:flex animate-rise" style={{ animationDelay: "180ms" }}>

              {/* Tools explored */}
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">TOOLS EXPLORED</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold leading-tight">{opened} of {total} tools opened</p>
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                    <ProgressRing value={opened} max={total} size={40} stroke={3} />
                    <span className="absolute text-[11px] font-bold">{Math.round((opened / total) * 100)}</span>
                  </div>
                </div>
              </div>

              {/* Top picks */}
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">TOP PICKS</p>
                <ul className="mt-3 space-y-3">
                  {TOP_PICKS.map(({ title, sub, meta, icon: Icon }) => (
                    <li key={title} className="flex items-start gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground/70">
                        <Icon className="h-4 w-4" strokeWidth={1.7} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold leading-tight">{title}</p>
                        <p className="text-[11px] leading-tight text-muted-foreground">{sub}</p>
                        <p className="mt-0.5 text-[10px] font-medium text-foreground/60">{meta}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recently added */}
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">RECENTLY ADDED</p>
                <ul className="mt-3 space-y-3">
                  {RECENT.map((r) => (
                    <li key={r.name} className="flex items-center gap-2">
                      <LibIcon type={r.icon} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold leading-tight">{r.name}</p>
                        <p className="text-[11px] text-muted-foreground">{r.meta}</p>
                      </div>
                      <button className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[10px] font-medium hover:bg-muted">
                        Open
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Study streak */}
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">STUDY STREAK</p>
                <div className="mt-3 flex items-center gap-2">
                  <Flame className="h-4 w-4 text-brand" />
                  <p className="text-sm font-semibold leading-tight">6 days in a row</p>
                </div>
                <div className="mt-3 flex items-center justify-between gap-1">
                  {STREAK_DAYS.map((done, i) => (
                    <span
                      key={i}
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold
                        ${done ? "border-brand bg-brand text-brand-foreground" : "border-border bg-card text-muted-foreground"}`}
                    >
                      {done ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                  ))}
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> 7h 20m studied this week
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}