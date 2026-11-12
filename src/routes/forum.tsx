import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, Smile, Sparkles, RotateCcw, Copy, ThumbsUp, ThumbsDown, BookOpen, Cpu, Calculator, FlaskConical } from "lucide-react";
import { AppSidebar, TopBar } from "@/components/layout/AppSidebar";

export const Route = createFileRoute("/forum")({
  head: () => ({ meta: [{ title: "AI Tutor - ExamGlow" }] }),
  component: Forum,
});

type Role = "user" | "ai";
type Msg = { id: number; role: Role; text: string; typing?: boolean };

const SUGGESTED = [
  "Explain Big O notation with examples",
  "What is the difference between a stack and a queue?",
  "Summarise integration by parts",
  "How do I read a balance sheet?",
  "Explain constitutional supremacy",
];

const TOPICS = [
  { icon: Cpu,          label: "Computer Science" },
  { icon: Calculator,   label: "Mathematics"      },
  { icon: FlaskConical, label: "Sciences"          },
  { icon: BookOpen,     label: "Business & Law"   },
];

const AI_RESPONSES: Record<string, string> = {
  default:
    "That's a great question! Let me break it down for you.\n\nBased on your curriculum, here is a clear explanation with the key points you need to know:\n\n1. **Core concept** — The foundation of this topic ties directly to what you covered in your previous module.\n2. **Why it matters** — Understanding this will help you in exams and in applying the concept practically.\n3. **Key formula or rule** — Refer to your notes for the exact syntax, but the pattern follows what we discussed.\n\nWould you like me to generate a practice question or a summary card for this topic?",
  "Explain Big O notation with examples":
    "**Big O notation** describes how an algorithm's runtime or space grows as the input size grows.\n\n**Common complexities (best to worst):**\n- **O(1)** — Constant: accessing an array element\n- **O(log n)** — Logarithmic: binary search\n- **O(n)** — Linear: looping through an array\n- **O(n log n)** — Log-linear: merge sort\n- **O(n²)** — Quadratic: bubble sort (nested loops)\n- **O(2ⁿ)** — Exponential: recursive Fibonacci\n\n**Example:** If you loop through a list of 1,000 items — that's O(n). If you loop inside a loop — that's O(n²) = 1,000,000 operations.\n\nWant a practice question on this?",
};

let msgId = 1;

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1">
      {[0,1,2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: i * 150 + "ms" }} />
      ))}
    </span>
  );
}

export default function Forum() {
  const [msgs,    setMsgs]    = useState<Msg[]>([
    { id: msgId++, role: "ai", text: "Hi! I'm your AI study tutor. Ask me anything about your modules — I can explain concepts, summarise topics, generate practice questions, and help you prepare for exams." },
  ]);
  const [draft,   setDraft]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { id: msgId++, role: "user", text: text.trim() };
    setMsgs((m) => [...m, userMsg]);
    setDraft("");
    setLoading(true);

    setTimeout(() => {
      const answer: string = AI_RESPONSES[text.trim()] ?? AI_RESPONSES["default"] ?? "";
      setMsgs((m) => [...m, { id: msgId++, role: "ai", text: answer }]);
      setLoading(false);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(draft); }
  };

  const formatText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      const bold = line.replace(/\*\*(.+?)\*\*/g, '<strong></strong>');
      return <p key={i} className={line === "" ? "h-3" : "leading-relaxed"} dangerouslySetInnerHTML={{ __html: bold }} />;
    });
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      <main className="flex min-w-0 flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-1 flex-col rounded-[1.75rem] bg-card p-6 md:p-8">

          <TopBar crumb="AI Tutor" searchPlaceholder="Search conversation..." />

          {/* header */}
          <div className="mt-8 flex items-center gap-3 animate-rise" style={{ animationDelay: "60ms" }}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-xl font-semibold">AI Study Tutor</h1>
              <p className="text-xs text-muted-foreground">Powered by ExamGlow AI &mdash; always learning with you</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {TOPICS.map(({ icon: Icon, label }) => (
                <button key={label} className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition md:flex">
                  <Icon className="h-3 w-3" strokeWidth={2} />{label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-border" />

          {/* messages */}
          <div className="mt-4 flex flex-1 flex-col gap-5 overflow-y-auto scrollbar-hide pr-1 animate-rise" style={{ animationDelay: "100ms", maxHeight: "calc(100vh - 380px)", minHeight: "240px" }}>

            {msgs.map((m) => (
              <div key={m.id} className={"flex gap-3 " + (m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role === "ai" && (
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">AI</span>
                )}
                <div className={"max-w-[80%] rounded-2xl px-4 py-3 text-sm " +
                  (m.role === "user"
                    ? "bg-foreground text-background rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm")}>
                  <div className="flex flex-col gap-0.5">{formatText(m.text)}</div>
                  {m.role === "ai" && (
                    <div className="mt-2.5 flex items-center gap-2 border-t border-border/50 pt-2">
                      <button className="flex items-center gap-1 rounded-lg p-1 text-xs text-muted-foreground hover:text-foreground transition"><Copy className="h-3 w-3" /> Copy</button>
                      <button className="rounded-lg p-1 text-muted-foreground hover:text-foreground transition"><ThumbsUp className="h-3 w-3" /></button>
                      <button className="rounded-lg p-1 text-muted-foreground hover:text-foreground transition"><ThumbsDown className="h-3 w-3" /></button>
                      <button className="ml-auto flex items-center gap-1 rounded-lg p-1 text-xs text-muted-foreground hover:text-foreground transition"><RotateCcw className="h-3 w-3" /> Regenerate</button>
                    </div>
                  )}
                </div>
                {m.role === "user" && (
                  <img src="https://i.pravatar.cc/80?img=47" alt="you" className="mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover" />
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">AI</span>
                <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3"><TypingDots /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* suggested prompts */}
          {msgs.length < 3 && (
            <div className="mt-4 flex flex-wrap gap-2 animate-rise" style={{ animationDelay: "140ms" }}>
              {SUGGESTED.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground hover:border-foreground/30 hover:text-foreground transition">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* input */}
          <div className="mt-4 flex items-end gap-2 rounded-2xl border border-border px-4 pb-3 pt-3 animate-rise" style={{ animationDelay: "160ms" }}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything about your studies..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground scrollbar-hide"
              style={{ maxHeight: "120px" }}
              onInput={(e) => {
                const t = e.currentTarget;
                t.style.height = "auto";
                t.style.height = t.scrollHeight + "px";
              }}
            />
            <div className="flex shrink-0 items-center gap-2">
              <button className="text-muted-foreground hover:text-foreground transition"><Paperclip className="h-4 w-4" /></button>
              <button className="text-muted-foreground hover:text-foreground transition"><Smile className="h-4 w-4" /></button>
              <button
                onClick={() => send(draft)}
                disabled={!draft.trim() || loading}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background transition disabled:opacity-30 hover:opacity-80"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            AI can make mistakes. Always verify answers with your course materials.
          </p>

        </div>
      </main>
    </div>
  );
}