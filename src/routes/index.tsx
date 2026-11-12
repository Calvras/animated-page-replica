import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, GraduationCap, Play, Star, Check, Plus, Clock, Users, BookOpen } from "lucide-react";
import man1 from "@/assets/man1.jpg";
import man2 from "@/assets/man2.jpg";
import woman from "@/assets/woman.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ExamGlow — Build new skills to advance your career" },
      { name: "description", content: "High-quality courses taught by industry experts to help you build real-world skills and confidence." },
      { property: "og:title", content: "ExamGlow — Build new skills to advance your career" },
      { property: "og:description", content: "High-quality courses taught by industry experts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1400);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const brands = ["Klarna", "Haier", "SAMSUNG", "CANNON", "TOYOTA", "Panasonic", "Spotify", "Adobe"];
const avatars = ["https://i.pravatar.cc/80?img=12", "https://i.pravatar.cc/80?img=14", "https://i.pravatar.cc/80?img=33", "https://i.pravatar.cc/80?img=59"];

const courses = [
  { title: "UI/UX Design Foundations", tag: "Design", hours: 24, students: "12.4K", img: woman },
  { title: "Full-Stack Web Development", tag: "Development", hours: 48, students: "18.1K", img: man2 },
  { title: "Leadership & Career Growth", tag: "Business", hours: 16, students: "9.7K", img: man1 },
];

const faqs = [
  { q: "Do I get a certificate?", a: "Yes. Every completed course comes with a shareable certificate you can add to your profile." },
  { q: "Can I learn at my own pace?", a: "Absolutely. All lessons are on-demand, so you can learn whenever it suits you." },
  { q: "Is there a free trial?", a: "You can start with a 7-day free trial on any plan and cancel anytime." },
  { q: "Who teaches the courses?", a: "Industry experts from leading companies who work in the field every day." },
];

function Index() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="font-display text-2xl font-bold tracking-tight">ExamGlow</a>
          <nav className="hidden gap-9 text-sm md:flex">
            {["Home", "About", "Courses", "Pricing", "Contact"].map((l, i) => (
              <a key={l} href={`#${l.toLowerCase()}`} className={`transition-opacity hover:opacity-60 ${i === 0 ? "font-semibold" : "text-foreground/80"}`}>{l}</a>
            ))}
          </nav>
          <div className="flex gap-3">
            <button className="rounded-full border border-foreground px-5 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background">Sign In</button>
            <button className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:scale-105">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-7xl px-6 pb-16 pt-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3 animate-rise">
            <img src={man1} alt="Smiling professional with laptop" width={768} height={896} className="aspect-[4/5] w-full rounded-3xl object-cover animate-floaty" />
            <div className="mt-16 hidden lg:block">
              <div className="flex -space-x-3">
                {avatars.map((a) => <img key={a} src={a} alt="" className="h-12 w-12 rounded-full border-2 border-background object-cover" />)}
              </div>
              <p className="mt-3 font-display text-4xl font-semibold"><Counter to={60} suffix="K+" /></p>
              <p className="text-sm text-muted-foreground">Members in our community</p>
            </div>
          </div>
          <div className="lg:col-span-9">
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <h1 className="animate-rise font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl" style={{ animationDelay: "120ms" }}>
                Build new skills<br />to advance your<br />career
              </h1>
              <div className="animate-rise max-w-[200px] pt-2" style={{ animationDelay: "300ms" }}>
                <GraduationCap className="h-8 w-8" strokeWidth={1.5} />
                <p className="mt-3 text-sm text-foreground/80">A smarter path to skills, growth, and success</p>
              </div>
            </div>
            <div className="mt-8 grid items-end gap-8 md:grid-cols-2">
              <div className="animate-rise" style={{ animationDelay: "400ms" }}>
                <p className="max-w-md text-foreground/80">High-quality courses taught by industry experts to help you build real-world skills and confidence. Start your journey today.</p>
                <Link to="/learn" className="group mt-8 inline-flex items-center gap-4 rounded-full bg-primary py-2 pl-6 pr-2 font-medium text-primary-foreground">
                  Get Started
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                
                </Link>
              </div>
              <img src={man2} alt="Student learning online" width={1024} height={768} className="animate-rise aspect-[4/3] w-full rounded-3xl object-cover" style={{ animationDelay: "550ms" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Brands marquee */}
      <section className="overflow-hidden py-10 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-20">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="font-display text-3xl font-bold tracking-wide text-muted-foreground/70">{b}</span>
          ))}
        </div>
      </section>

      {/* About / Stats */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">About ExamGlow</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Learning designed around real careers, not just certificates.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            { n: 60, s: "K+", l: "Active learners" },
            { n: 350, s: "+", l: "Expert-led courses" },
            { n: 120, s: "+", l: "Industry mentors" },
            { n: 94, s: "%", l: "Career satisfaction" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100}>
              <div className="rounded-3xl bg-card p-8 transition-transform hover:-translate-y-1">
                <p className="font-display text-5xl font-semibold"><Counter to={s.n} suffix={s.s} /></p>
                <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Popular courses</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Start with our top picks</h2>
          </div>
          <button className="rounded-full border border-foreground px-6 py-3 text-sm font-medium transition hover:bg-foreground hover:text-background">View all courses</button>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {courses.map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <article className="group overflow-hidden rounded-3xl bg-card p-3 transition-shadow hover:shadow-2xl">
                <div className="overflow-hidden rounded-2xl">
                  <img src={c.img} alt={c.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{c.tag}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{c.title}</h3>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{c.hours}h</span>
                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{c.students}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works - dark */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-[2.5rem] bg-primary px-8 py-20 text-primary-foreground md:px-16">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] opacity-60">How it works</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-5xl">Three steps to your next career move</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              { i: BookOpen, t: "Choose a path", d: "Pick from curated learning paths built with hiring managers." },
              { i: Play, t: "Learn by doing", d: "Watch short lessons and complete hands-on real-world projects." },
              { i: GraduationCap, t: "Get certified", d: "Earn certificates and showcase your new skills to employers." },
            ].map((s, k) => (
              <Reveal key={s.t} delay={k * 150}>
                <div className="border-t border-primary-foreground/20 pt-6">
                  <span className="font-display text-sm opacity-50">0{k + 1}</span>
                  <s.i className="mt-4 h-8 w-8" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-2xl font-semibold">{s.t}</h3>
                  <p className="mt-2 opacity-70">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        <Reveal>
          <img src={woman} alt="Learner studying" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        </Reveal>
        <Reveal delay={150}>
          <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-foreground" />)}</div>
          <blockquote className="mt-6 font-display text-3xl font-medium leading-snug tracking-tight">
            "ExamGlow helped me move from retail into product design in eight months. The mentors genuinely care."
          </blockquote>
          <p className="mt-6 font-semibold">Sofia Martín</p>
          <p className="text-sm text-muted-foreground">Product Designer at Klarna</p>
        </Reveal>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Pricing</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Simple plans for every learner</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { n: "Starter", p: "$0", f: ["5 free courses", "Community access", "Basic certificates"] },
            { n: "Pro", p: "$19", f: ["All 350+ courses", "Hands-on projects", "Verified certificates", "Mentor Q&A"], hi: true },
            { n: "Team", p: "$49", f: ["Everything in Pro", "Team dashboard", "Custom learning paths", "Priority support"] },
          ].map((p, i) => (
            <Reveal key={p.n} delay={i * 120}>
              <div className={`flex h-full flex-col rounded-3xl p-8 transition-transform hover:-translate-y-2 ${p.hi ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                <h3 className="font-display text-xl font-semibold">{p.n}</h3>
                <p className="mt-6 font-display text-5xl font-semibold">{p.p}<span className="text-base font-normal opacity-60">/mo</span></p>
                <ul className="mt-8 flex-1 space-y-3">
                  {p.f.map((f) => <li key={f} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4" />{f}</li>)}
                </ul>
                <button className={`mt-8 rounded-full py-3 text-sm font-medium transition hover:opacity-80 ${p.hi ? "bg-background text-foreground" : "bg-primary text-primary-foreground"}`}>Choose {p.n}</button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <Reveal><h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Questions, answered</h2></Reveal>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between py-6 text-left font-display text-xl font-medium">
                {f.q}
                <Plus className={`h-5 w-5 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <p className="overflow-hidden text-muted-foreground">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA + footer */}
      <footer id="contact" className="mx-auto max-w-7xl px-6 pb-10">
        <Reveal>
          <div className="rounded-[2.5rem] bg-primary px-8 py-20 text-center text-primary-foreground">
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">Your next skill starts today.</h2>
            <a href="#pricing" className="group mt-10 inline-flex items-center gap-4 rounded-full bg-background py-2 pl-6 pr-2 font-medium text-foreground">
              Get Started
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45"><ArrowUpRight className="h-5 w-5" /></span>
            </a>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display text-xl font-bold text-foreground">ExamGlow</span>
          <span>hello@ExamGlow.com</span>
          <span>© 2026 ExamGlow. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

