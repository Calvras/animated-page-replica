import type { ComponentType, SVGProps } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppSidebar, TopBar } from "@/components/layout/AppSidebar";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

export type StubItem = { title: string; desc: string; meta?: string };

export function StubPage({
  crumb,
  eyebrow,
  title,
  description,
  icon: Icon,
  searchPlaceholder,
  items,
}: {
  crumb: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: IconType;
  searchPlaceholder?: string;
  items: StubItem[];
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      <main className="flex min-w-0 flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-1 flex-col rounded-[1.75rem] bg-card p-6 md:p-8">
          <TopBar crumb={crumb} searchPlaceholder={searchPlaceholder ?? `Search ${crumb.toLowerCase()}...`} />

          <div className="mt-10 animate-rise" style={{ animationDelay: "60ms" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
            <h1 className="mt-2 flex items-center gap-3 font-display text-4xl font-semibold tracking-tight">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted">
                <Icon className="h-5 w-5 text-foreground/60" strokeWidth={1.7} />
              </span>
              {title}
            </h1>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="mt-8 border-t border-border" />

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3 animate-rise" style={{ animationDelay: "120ms" }}>
            {items.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-5 transition hover:shadow-md"
              >
                <h2 className="font-display text-base font-semibold leading-snug">{item.title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                {item.meta && <p className="mt-3 text-[11px] font-medium text-foreground/40">{item.meta}</p>}
                <Link
                  to="/browse"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                >
                  Explore <ChevronRight className="h-3 w-3" />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            This section is scaffolded and shares the global navigation. Content is being migrated.
          </p>
        </div>
      </main>
    </div>
  );
}