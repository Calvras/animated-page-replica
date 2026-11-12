import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight as ChevRight, Clock, BookOpen, FileText, HelpCircle } from "lucide-react";
import { AppSidebar, TopBar } from "@/components/layout/AppSidebar";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar - ExamGlow" }] }),
  component: CalendarPage,
});

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

type EventType = { day: number; time: string; title: string; type: "exam"|"assignment"|"lecture"|"quiz"; code: string };

const EVENTS: EventType[] = [
  { day:3,  time:"09:00", title:"CS201 Lecture — Hash Tables",        type:"lecture",    code:"CS201" },
  { day:5,  time:"14:00", title:"MTH101 Assignment due",              type:"assignment", code:"MTH101" },
  { day:8,  time:"10:00", title:"BUS201 Quiz — Balance Sheets",       type:"quiz",       code:"BUS201" },
  { day:10, time:"09:00", title:"CS201 Lecture — Trees & Graphs",     type:"lecture",    code:"CS201" },
  { day:12, time:"All day",title:"CS201 Past Paper practice",         type:"assignment", code:"CS201" },
  { day:15, time:"11:00", title:"MTH101 Mid-term Exam",               type:"exam",       code:"MTH101" },
  { day:17, time:"09:00", title:"BUS201 Lecture — Income Statements", type:"lecture",    code:"BUS201" },
  { day:20, time:"14:00", title:"CS201 Assignment due",               type:"assignment", code:"CS201" },
  { day:22, time:"10:00", title:"MTH101 Quiz — Integrals",            type:"quiz",       code:"MTH101" },
  { day:24, time:"09:00", title:"CS201 Lecture — Dynamic Programming",type:"lecture",    code:"CS201" },
  { day:28, time:"All day",title:"BUS201 Group project due",          type:"assignment", code:"BUS201" },
];

const TYPE_STYLE: Record<EventType["type"], string> = {
  exam:       "bg-foreground text-background",
  assignment: "border border-border text-foreground bg-card",
  lecture:    "bg-muted text-foreground",
  quiz:       "border border-border bg-muted/60 text-foreground",
};
const TYPE_DOT: Record<EventType["type"], string> = {
  exam:"bg-foreground", assignment:"bg-foreground/40", lecture:"bg-foreground/25", quiz:"bg-foreground/30",
};

function buildGrid(year: number, month: number) {
  const first = new Date(year, month, 1).getDay(); // 0=Sun
  const startOffset = (first + 6) % 7; // make Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarPage() {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [sel,   setSel]   = useState<number | null>(today.getDate());

  const cells = buildGrid(year, month);

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); setSel(null); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); setSel(null); };

  const dayEvents = sel ? EVENTS.filter(e => e.day === sel) : [];

  const typeIcon = (t: EventType["type"]) => {
    if (t === "exam") return FileText;
    if (t === "quiz") return HelpCircle;
    if (t === "lecture") return BookOpen;
    return FileText;
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      <main className="flex min-w-0 flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-1 flex-col rounded-[1.75rem] bg-card p-6 md:p-8">

          <TopBar crumb="Calendar" />

          <div className="mt-10 animate-rise" style={{ animationDelay: "60ms" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Study Schedule</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Calendar</h1>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-[1fr_280px] animate-rise" style={{ animationDelay: "100ms" }}>

            {/* CALENDAR GRID */}
            <div className="rounded-2xl border border-border overflow-hidden">
              {/* month nav */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <h2 className="font-display text-base font-semibold">{MONTHS[month]} {year}</h2>
                <div className="flex items-center gap-1">
                  <button onClick={prev} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition"><ChevronLeft className="h-4 w-4" /></button>
                  <button onClick={next} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition"><ChevRight className="h-4 w-4" /></button>
                </div>
              </div>

              {/* day names */}
              <div className="grid grid-cols-7 border-b border-border">
                {DAYS.map((d) => (
                  <div key={d} className="py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{d}</div>
                ))}
              </div>

              {/* date cells */}
              <div className="grid grid-cols-7 divide-x divide-y divide-border">
                {cells.map((day, i) => {
                  if (day === null) return <div key={i} className="min-h-[60px] bg-muted/20" />;
                  const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  const isSel   = day === sel;
                  const evts    = EVENTS.filter(e => e.day === day);
                  return (
                    <button
                      key={i}
                      onClick={() => setSel(day === sel ? null : day)}
                      className={"min-h-[60px] flex flex-col items-start gap-1 p-2 text-left transition hover:bg-muted/40 " + (isSel ? "bg-muted" : "")}
                    >
                      <span className={"flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium " +
                        (isToday ? "bg-foreground text-background" : "text-foreground")}>
                        {day}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {evts.map((e) => (
                          <span key={e.title} className={"h-1.5 w-1.5 rounded-full " + TYPE_DOT[e.type]} />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* EVENT DETAIL PANEL */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {sel ? `${MONTHS[month]} ${sel}` : "Select a day"}
              </p>

              {sel && dayEvents.length === 0 && (
                <p className="rounded-2xl bg-muted px-4 py-8 text-center text-sm text-muted-foreground">No events this day.</p>
              )}

              {dayEvents.map((e) => {
                const Icon = typeIcon(e.type);
                return (
                  <div key={e.title} className={"rounded-2xl p-4 " + TYPE_STYLE[e.type]}>
                    <div className="flex items-start gap-3">
                      <span className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-lg " + (e.type === "exam" ? "bg-background/20" : "bg-muted")}>
                        <Icon className="h-4 w-4" strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{e.code} &middot; {e.type}</p>
                        <p className="mt-0.5 text-sm font-semibold leading-snug">{e.title}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs opacity-60"><Clock className="h-3 w-3" />{e.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* upcoming */}
              <div className="mt-2">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Upcoming</p>
                {EVENTS.slice(0, 4).map((e) => (
                  <div key={e.title} className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm hover:bg-muted transition">
                    <span className={"h-2 w-2 shrink-0 rounded-full " + TYPE_DOT[e.type]} />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium">{e.title}</p>
                      <p className="text-[10px] text-muted-foreground">{MONTHS[month]} {e.day} · {e.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}