import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Compass, Layers, PlaySquare, BookOpen, Calendar, MessageCircle, GraduationCap, Users, Trophy,
  Presentation, FolderOpen, Library, Download, ShoppingBag, Search, SkipBack, SkipForward,
  Play, Pause, Volume2, Captions, SlidersHorizontal, Cast, Maximize, ThumbsUp, ThumbsDown,
  Bookmark, Share2, Eye, Send, UserCircle, ListFilter, Reply, Bell, Settings,
  Check, Flame, Paperclip, Smile, AtSign, CornerDownLeft, ChevronRight,
} from "lucide-react";
import car from "@/assets/car-render.jpg";
import { AppSidebar, TopBar } from "@/components/layout/AppSidebar";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Creating a high-speed automotive cinematic render - ExamGlow" },
      { name: "description", content: "Learn high-impact automotive cinematics in Blender." },
    ],
  }),
  component: Learn,
});

const TABS = [
  { l: "Overview",   n: null   },
  { l: "Notes",      n: "12"   },
  { l: "Transcript", n: "1.2K" },
  { l: "Q&A",        n: "6"    },
  { l: "Discussion", n: "27"   },
];

const TASKS = [
  { label: "Watch lesson",        sub: "Cover 25 min",     xp: 20,   done: true,  active: false },
  { label: "Practice in Blender", sub: "Model 1 scene",    xp: 35,   done: true,  active: false },
  { label: "Review lesson notes", sub: "Save 3 insights",  xp: null, done: false, active: true  },
  { label: "Submit homework",     sub: "Deliver final file",xp: null, done: false, active: false },
  { label: "Improve your project",sub: "Add 2 updates",    xp: null, done: false, active: false },
];

const MATERIALS = [
  { name: "cinematic_scene_setup.blend", meta: "21 MB · Blender",              icon: "blender" },
  { name: "render_pass_template.psd",    meta: "12.4 MB · Adobe Photoshop",    icon: "ps"      },
  { name: "lighting_reference_board.pdf",meta: "890 KB · Adobe Acrobat Reader",icon: "pdf"     },
];

const RELATED = [
  {
    title:  "3D lighting fundamentals",
    sub:    "Improve your scene with simple lighting tricks for better clarity.",
    meta:   "5 min read · 9.3K views",
    action: "Read article",
    img:    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=120&q=80",
  },
  {
    title:  "Creating realistic materials in...",
    sub:    "Grab five sky maps for quick environment lighting on any render.",
    meta:   "24 MB file · 6.4K downloads",
    action: "Download",
    img:    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=120&q=80",
  },
  {
    title:  "Lighting your first 3D scene",
    sub:    null,
    meta:   null,
    action: null,
    img:    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=120&q=80",
  },
];

const TOTAL = 25 * 60 + 33;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

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

function MatIcon({ type }: { type: string }) {
  const map: Record<string, { bg: string; label: string }> = {
    blender: { bg: "bg-slate-500", label: "B"  },
    ps:      { bg: "bg-blue-600",   label: "Ps" },
    pdf:     { bg: "bg-red-600",    label: "A"  },
  };
  const { bg, label } = map[type] ?? { bg: "bg-muted", label: "?" };
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white ${bg}`}>
      {label}
    </span>
  );
}

export default function Learn() {
  const [playing, setPlaying] = useState(false);
  const [time,    setTime]    = useState(208);
  const [tab,     setTab]     = useState("Discussion");
  const [liked,   setLiked]   = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [more,    setMore]    = useState(false);
  const [draft,   setDraft]   = useState("Ok classmates, put your hel");
  const uploadPct = 68;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTime((t) => Math.min(TOTAL, t + 1)), 1000);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">

      {/* LEFT SIDEBAR */}
      <AppSidebar />

      {/* MAIN */}
      <main className="flex min-w-0 flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-1 flex-col rounded-[1.75rem] bg-card p-5 md:p-6">

          {/* TOP BAR */}
          <TopBar crumb="Creating a high-speed automotive cinematic render" trail={["Courses", "Blender Foundations"]} />

          {/* TWO COLUMNS */}
          <div className="mt-5 flex gap-5 min-w-0">

            {/* LEFT COLUMN */}
            <div className="flex min-w-0 flex-1 flex-col gap-5">

              {/* VIDEO */}
              <div className="group relative overflow-hidden rounded-2xl animate-rise" style={{ animationDelay: "80ms" }}>
                <img
                  src={car}
                  alt="Silver sports car cinematic render"
                  className={`aspect-[16/8.5] w-full object-cover transition-transform duration-[20s] ease-linear ${playing ? "scale-110" : "scale-100"}`}
                />
                {!playing && (
                  <button
                    onClick={() => setPlaying(true)}
                    aria-label="Play"
                    className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-background/80 backdrop-blur transition hover:scale-110"
                  >
                    <Play className="ml-1 h-7 w-7 fill-foreground" />
                  </button>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/60 to-transparent px-5 pb-4 pt-10 text-white">
                  <button onClick={() => setTime((t) => Math.max(0, t - 10))}><SkipBack className="h-4 w-4 fill-white" /></button>
                  <button onClick={() => setPlaying(!playing)}>
                    {playing ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
                  </button>
                  <button onClick={() => setTime((t) => Math.min(TOTAL, t + 10))}><SkipForward className="h-4 w-4 fill-white" /></button>
                  <span className="text-xs tabular-nums">{fmt(time)}/{fmt(TOTAL)}</span>
                  <input
                    type="range" min={0} max={TOTAL} value={time}
                    onChange={(e) => setTime(+e.target.value)}
                    className="h-0.5 flex-1 cursor-pointer accent-brand"
                    aria-label="Seek"
                  />
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-4 w-4" />
                    <Captions className="h-4 w-4" />
                    <SlidersHorizontal className="h-4 w-4" />
                    <Cast className="h-4 w-4" />
                    <Maximize className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* TITLE ROW */}
              <div className="flex flex-wrap items-start justify-between gap-3 animate-rise" style={{ animationDelay: "160ms" }}>
                <h1 className="font-display text-xl font-semibold leading-snug md:text-2xl">
                  Creating a high-speed automotive cinematic render
                </h1>
                <div className="flex shrink-0 items-center gap-2">
                  <div className="flex items-center gap-3 rounded-full border border-border px-4 py-2 text-sm">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`flex items-center gap-1.5 transition ${liked ? "text-brand" : ""}`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${liked ? "fill-brand" : ""}`} />
                      {liked ? "1.2K+" : "1.2K"}
                    </button>
                    <span className="h-4 w-px bg-border" />
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <ThumbsDown className="h-4 w-4" />27
                    </span>
                  </div>
                  <button
                    onClick={() => setSaved(!saved)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-muted"
                  >
                    <Bookmark className={`h-4 w-4 ${saved ? "fill-foreground" : ""}`} />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-muted">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* MENTOR + META */}
              <div className="grid gap-3 sm:grid-cols-[auto_1fr] animate-rise" style={{ animationDelay: "220ms" }}>
                <div className="rounded-2xl bg-muted p-4 sm:w-64">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src="https://i.pravatar.cc/80?img=13" alt="Ethan Ramirez" className="h-10 w-10 rounded-full object-cover" />
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-muted" style={{ backgroundColor: "oklch(0.7 0.17 150)" }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Ethan Ramirez</p>
                      <p className="text-xs text-muted-foreground">Course mentor · Lead 3D Artist</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground transition hover:opacity-90">
                      <Send className="h-3 w-3" /> Message
                    </button>
                    <button className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium transition hover:bg-background">
                      <UserCircle className="h-3 w-3" /> View profile
                    </button>
                  </div>
                </div>
                <div className="rounded-2xl bg-muted p-4 text-sm">
                  <div className="flex flex-wrap gap-5 text-xs font-medium">
                    <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5 text-muted-foreground" />12.4K</span>
                    <span className="flex items-center gap-1.5"><ThumbsUp className="h-3.5 w-3.5 text-muted-foreground" />1.2K</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-muted-foreground" />Nov 8, 2025</span>
                  </div>
                  <p className={`mt-2 text-xs text-foreground/80 ${more ? "" : "line-clamp-2"}`}>
                    In this lesson, you will learn how to create high-impact automotive cinematics in Blender
                    using motion blur, HDRI lighting, and fast-rendering techniques. We will cover scene
                    setup, camera animation, realistic reflections, and strategies for achieving smoo...
                  </p>
                  <button onClick={() => setMore(!more)} className="mt-1 text-xs font-semibold">
                    {more ? "Less" : "More"}
                  </button>
                </div>
              </div>

              {/* TABS */}
              <div className="flex flex-wrap items-center justify-between gap-2 animate-rise" style={{ animationDelay: "300ms" }}>
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
                        {n && (
                          <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/25" : "bg-muted text-muted-foreground"}`}>
                            {n}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ListFilter className="h-4 w-4" /> Relevance
                </span>
              </div>

              {/* TAB CONTENT */}
              <div key={tab} className="animate-rise" style={{ animationDelay: "350ms" }}>
                {tab === "Discussion" ? (
                  <div className="space-y-5">
                    <div className="flex gap-3">
                      <img src="https://i.pravatar.cc/80?img=15" alt="" className="h-9 w-9 rounded-full object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">@meshdriver</span>{" "}
                          <span className="text-xs text-muted-foreground">4 hours ago</span>
                        </p>
                        <p className="mt-1 text-sm text-foreground/80">
                          This is honestly the cleanest motion blur I've seen in a Blender render. The way the highlights
                          smear across the body while still keeping the car readable is insanely good.
                        </p>
                      </div>
                    </div>

                    {/* Upload progress */}
                    <div className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3">
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">car_rig_setup.blend</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                              <div className="h-full rounded-full bg-brand" style={{ width: `${uploadPct}%` }} />
                            </div>
                            <span className="shrink-0 text-xs text-muted-foreground">3.2 MB · Uploading · {uploadPct}%</span>
                          </div>
                        </div>
                      </div>
                      <button className="shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium hover:bg-muted">
                        Cancel
                      </button>
                    </div>

                    {/* Compose */}
                    <div className="rounded-2xl border border-border px-4 pb-3 pt-3">
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      />
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <button aria-label="Attach"><Paperclip className="h-4 w-4 hover:text-foreground" /></button>
                          <button aria-label="Emoji"><Smile className="h-4 w-4 hover:text-foreground" /></button>
                          <button aria-label="Mention"><AtSign className="h-4 w-4 hover:text-foreground" /></button>
                          <button aria-label="Format"><CornerDownLeft className="h-4 w-4 hover:text-foreground" /></button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:bg-muted">
                            Discard
                          </button>
                          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-foreground hover:opacity-90">
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-muted p-8 text-center text-sm text-muted-foreground">
                    {tab} for this lesson will appear here.
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="hidden w-56 shrink-0 flex-col gap-4 xl:flex animate-rise" style={{ animationDelay: "180ms" }}>

              {/* Course Progress */}
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">COURSE PROGRESS</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold leading-tight">7 of 16 lessons completed</p>
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                    <ProgressRing value={7} max={16} size={40} stroke={3} />
                    <span className="absolute text-[11px] font-bold">42</span>
                  </div>
                </div>
              </div>

              {/* Lesson Tasks */}
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">LESSON TASKS</p>
                <ul className="mt-3 space-y-3">
                  {TASKS.map((task) => (
                    <li key={task.label} className="flex items-start gap-2.5">
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border
                        ${task.done
                          ? "border-brand bg-brand text-brand-foreground"
                          : task.active
                            ? "border-destructive bg-destructive/10"
                            : "border-border bg-card"
                        }`}>
                        {task.done && <Check className="h-3 w-3" />}
                        {!task.done && task.active && <span className="h-2 w-2 rounded-full bg-destructive" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold leading-tight">{task.label}</p>
                        <p className="text-[11px] text-muted-foreground">{task.sub}</p>
                      </div>
                      {task.xp != null && (
                        <span className="flex items-center gap-0.5 rounded-full bg-foreground/10 px-1.5 py-0.5 text-[10px] font-bold text-foreground/70">
                          <Flame className="h-2.5 w-2.5" />{task.xp}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lesson Materials */}
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">LESSON MATERIALS</p>
                <ul className="mt-3 space-y-3">
                  {MATERIALS.map((m) => (
                    <li key={m.name} className="flex items-center gap-2">
                      <MatIcon type={m.icon} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-semibold leading-tight">{m.name}</p>
                        <p className="text-[10px] text-muted-foreground">{m.meta}</p>
                      </div>
                      <button className="shrink-0 text-[11px] font-semibold text-brand hover:underline">Download</button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Content */}
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">RELATED CONTENT</p>
                <ul className="mt-3 space-y-4">
                  {RELATED.map((r) => (
                    <li key={r.title} className="flex gap-2.5">
                      <img src={r.img} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold leading-tight">{r.title}</p>
                        {r.sub && <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground">{r.sub}</p>}
                        {r.meta && <p className="mt-0.5 text-[10px] text-muted-foreground">{r.meta}</p>}
                        {r.action && (
                          <button className="mt-1 text-[11px] font-semibold text-brand hover:underline">{r.action}</button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}