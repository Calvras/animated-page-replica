import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Compass, Layers, PlaySquare, BookOpen, Calendar, MessageCircle, GraduationCap, Users, Trophy,
  Presentation, FolderOpen, Library, Download, ShoppingBag, Search, SkipBack, SkipForward, Play, Pause,
  Volume2, Captions, SlidersHorizontal, Cast, Maximize, ThumbsUp, ThumbsDown, Bookmark, Share2, Eye,
  Send, UserCircle, ListFilter, Reply,
} from "lucide-react";
import car from "@/assets/car-render.jpg";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Creating a high-speed automotive cinematic render — SkillNest" },
      { name: "description", content: "Learn high-impact automotive cinematics in Blender with motion blur, HDRI lighting and fast rendering." },
      { property: "og:title", content: "Automotive cinematic render lesson — SkillNest" },
      { property: "og:description", content: "Blender Foundations lesson with mentor Ethan Ramirez." },
      { property: "og:type", content: "video.other" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Learn,
});

const nav = [
  { h: "Learning", items: [["Browse", Compass], ["Programs", Layers], ["Courses", PlaySquare], ["My classroom", BookOpen], ["Calendar", Calendar]] },
  { h: "Community", items: [["Forum", MessageCircle], ["Mentors", GraduationCap], ["Students", Users], ["Challenges", Trophy], ["Workshops", Presentation]] },
  { h: "Resources", items: [["Materials", FolderOpen], ["Assets library", Library], ["Downloads", Download], ["Store", ShoppingBag]] },
] as const;

const tabs = [["Overview"], ["Notes", "12"], ["Transcript", "1.2K"], ["Q&A", "6"], ["Discussion", "27"]] as const;

const comments = [
  { u: "@meshdriver", t: "4 hours ago", img: 15, c: "This is honestly the cleanest motion blur I've seen in a Blender render. The way the highlights streak across the body is perfect." },
  { u: "@polyqueen", t: "6 hours ago", img: 47, c: "The HDRI tip at 12:40 saved me hours. Would love a follow-up on compositing the final shot!" },
  { u: "@render.rick", t: "1 day ago", img: 52, c: "Followed along with my own car model and it came out amazing. Thanks Ethan 🙌" },
];

const TOTAL = 25 * 60 + 33;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function Learn() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(208);
  const [tab, setTab] = useState("Discussion");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [more, setMore] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTime((t) => Math.min(TOTAL, t + 1)), 1000);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto px-6 py-8 lg:block animate-rise">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">SkillNest</Link>
        {nav.map((g) => (
          <div key={g.h} className="mt-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{g.h}</p>
            <ul className="mt-3 space-y-1">
              {g.items.map(([l, I]) => {
                const active = l === "Courses";
                return (
                  <li key={l}>
                    <a href="#" className={`relative flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-card ${active ? "text-brand" : ""}`}>
                      {active && <span className="absolute -left-6 h-6 w-1 rounded-r bg-brand" />}
                      <I className="h-5 w-5" strokeWidth={1.6} />{l}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>

      <main className="flex-1 p-4 md:p-6">
        <div className="rounded-[2rem] bg-card p-5 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 animate-rise">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link><span>/</span>
              <span>Courses</span><span>/</span><span>Blender Foundations</span><span>/</span>
              <span className="text-foreground">Creating a high-speed automotive cinematic render</span>
            </nav>
            <label className="flex w-64 items-center gap-2 rounded-full bg-muted px-4 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search..." className="w-full bg-transparent text-sm outline-none" />
            </label>
          </div>

          {/* Player */}
          <div className="group relative mt-6 overflow-hidden rounded-3xl animate-rise" style={{ animationDelay: "120ms" }}>
            <img src={car} alt="Silver sports car cinematic render" width={1600} height={864} className={`aspect-[16/8.5] w-full object-cover transition-transform duration-[20s] ease-linear ${playing ? "scale-110" : "scale-100"}`} />
            {!playing && (
              <button onClick={() => setPlaying(true)} aria-label="Play" className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-background/80 backdrop-blur transition hover:scale-110">
                <Play className="ml-1 h-8 w-8 fill-foreground" />
              </button>
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-foreground/60 to-transparent px-6 pb-5 pt-12 text-background">
              <button onClick={() => setTime((t) => Math.max(0, t - 10))} aria-label="Back"><SkipBack className="h-5 w-5 fill-background" /></button>
              <button onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause className="h-5 w-5 fill-background" /> : <Play className="h-5 w-5 fill-background" />}
              </button>
              <button onClick={() => setTime((t) => Math.min(TOTAL, t + 10))} aria-label="Forward"><SkipForward className="h-5 w-5 fill-background" /></button>
              <span className="text-sm tabular-nums">{fmt(time)}/{fmt(TOTAL)}</span>
              <input type="range" min={0} max={TOTAL} value={time} onChange={(e) => setTime(+e.target.value)} className="h-1 flex-1 cursor-pointer accent-brand" aria-label="Seek" />
              <div className="hidden items-center gap-4 sm:flex">
                <Volume2 className="h-5 w-5" /><Captions className="h-5 w-5" /><SlidersHorizontal className="h-5 w-5" /><Cast className="h-5 w-5" /><Maximize className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 animate-rise" style={{ animationDelay: "220ms" }}>
            <h1 className="font-display text-2xl font-medium md:text-3xl">Creating a high-speed automotive cinematic render</h1>
            <div className="flex gap-2">
              <div className="flex items-center gap-4 rounded-full border px-4 py-2 text-sm">
                <button onClick={() => setLiked(!liked)} className={`flex items-center gap-1.5 transition ${liked ? "text-brand" : ""}`}>
                  <ThumbsUp className={`h-4 w-4 ${liked ? "fill-brand" : ""}`} />{liked ? "1.2K+" : "1.2K"}
                </button>
                <span className="flex items-center gap-1.5"><ThumbsDown className="h-4 w-4" />27</span>
              </div>
              <button onClick={() => setSaved(!saved)} aria-label="Save" className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-muted">
                <Bookmark className={`h-4 w-4 ${saved ? "fill-foreground" : ""}`} />
              </button>
              <button aria-label="Share" className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-muted"><Share2 className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,320px)_1fr] animate-rise" style={{ animationDelay: "320ms" }}>
            <div className="rounded-2xl bg-muted p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="https://i.pravatar.cc/80?img=13" alt="Ethan Ramirez" className="h-10 w-10 rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-muted bg-chart-2" style={{ backgroundColor: "oklch(0.7 0.17 150)" }} />
                </div>
                <div>
                  <p className="font-medium">Ethan Ramirez</p>
                  <p className="text-xs text-muted-foreground">Course mentor · Lead 3D Artist</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90"><Send className="h-4 w-4" />Message</button>
                <button className="flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-medium transition hover:bg-background"><UserCircle className="h-4 w-4" />View profile</button>
              </div>
            </div>
            <div className="rounded-2xl bg-muted p-4 text-sm">
              <div className="flex flex-wrap gap-5 font-medium">
                <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" />12.4K</span>
                <span className="flex items-center gap-1.5"><ThumbsUp className="h-4 w-4" />1.2K</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Nov 8, 2025</span>
              </div>
              <p className={`mt-2 text-foreground/80 ${more ? "" : "line-clamp-2"}`}>
                In this lesson, you'll learn how to create high-impact automotive cinematics in Blender using motion blur, HDRI lighting, and fast-rendering techniques. We'll cover scene setup, camera animation, realistic reflections, and strategies for achieving smooth, production-ready renders on any hardware.
              </p>
              <button onClick={() => setMore(!more)} className="mt-1 font-medium">{more ? "Less" : "More"}</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {tabs.map(([l, n]) => {
                const a = tab === l;
                return (
                  <button key={l} onClick={() => setTab(l)} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${a ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"}`}>
                    {l}{n && <span className={`rounded-full px-2 text-xs ${a ? "bg-background/25" : "bg-muted text-muted-foreground"}`}>{n}</span>}
                  </button>
                );
              })}
            </div>
            <span className="flex items-center gap-2 text-sm"><ListFilter className="h-4 w-4" />Relevance</span>
          </div>

          <div key={tab} className="mt-6 animate-rise">
            {tab === "Discussion" ? (
              <ul className="space-y-6">
                {comments.map((c) => (
                  <li key={c.u} className="flex gap-3">
                    <img src={`https://i.pravatar.cc/80?img=${c.img}`} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium">{c.u} <span className="text-sm font-normal text-muted-foreground">{c.t}</span></p>
                      <p className="mt-1 text-foreground/80">{c.c}</p>
                      <button className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><Reply className="h-4 w-4" />Reply</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl bg-muted p-8 text-center text-muted-foreground">
                {tab} for this lesson will appear here.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
