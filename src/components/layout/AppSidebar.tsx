import { Link, useLocation } from "@tanstack/react-router";
import {
  Compass, Layers, PlaySquare, BookOpen, Calendar, MessageCircle,
  GraduationCap, Users, Trophy, Presentation, FolderOpen, Library,
  Download, ShoppingBag, Bell, Settings, Search,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

const NAV: { h: string; items: { label: string; icon: IconType; to: string }[] }[] = [
  { h: "LEARNING", items: [
    { label: "Browse",       icon: Compass,       to: "/browse"    },
    { label: "Programs",     icon: Layers,        to: "/programs"  },
    { label: "Courses",      icon: PlaySquare,    to: "/learn"     },
    { label: "My classroom", icon: BookOpen,      to: "/classroom" },
    { label: "Calendar",     icon: Calendar,      to: "/calendar"  },
  ]},
  { h: "COMMUNITY", items: [
    { label: "Forum",      icon: MessageCircle, to: "/forum"   },
    { label: "Mentors",    icon: GraduationCap, to: "/mentors"    },
    { label: "Students",   icon: Users,         to: "/students"   },
    { label: "Challenges", icon: Trophy,        to: "/challenges" },
    { label: "Workshops",  icon: Presentation,  to: "/workshops"  },
  ]},
  { h: "RESOURCES", items: [
    { label: "Materials",      icon: FolderOpen,  to: "/materials" },
    { label: "Assets library", icon: Library,     to: "/assets"    },
    { label: "Downloads",      icon: Download,    to: "/downloads" },
    { label: "Store",          icon: ShoppingBag, to: "/store"     },
  ]},
];

export function TopBar({ crumb, trail = [], searchPlaceholder = "Search..." }: { crumb: string; trail?: string[]; searchPlaceholder?: string }) {
  return (
    <div className="flex flex-col gap-3 animate-rise">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        {trail.map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <span className="h-3 w-px bg-border mx-0.5" />
            <span>{t}</span>
          </span>
        ))}
        <span className="h-3 w-px bg-border mx-0.5" />
        <span className="max-w-[220px] truncate font-medium text-foreground">{crumb}</span>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <label className="flex w-52 items-center gap-2 rounded-full bg-muted px-4 py-2">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            aria-label="Search"
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
        <button className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">
          <span>&#9733;</span> Upgrade to PRO
        </button>
        <button aria-label="Notifications" className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted"><Bell className="h-4 w-4" /></button>
        <button aria-label="Settings" className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted"><Settings className="h-4 w-4" /></button>
        <img src="https://i.pravatar.cc/80?img=47" alt="avatar" className="h-9 w-9 rounded-full object-cover" />
      </div>
    </div>
  );
}

export function AppSidebar() {
  const loc = useLocation();
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col overflow-y-auto scrollbar-hide px-5 py-7 lg:flex animate-rise">
      <Link to="/" className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-brand-foreground">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
            <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9" strokeLinecap="round"/>
            <path d="M12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5" strokeLinecap="round"/>
            <circle cx="18" cy="6" r="2" fill="currentColor" stroke="none"/>
          </svg>
        </span>
        <span className="font-display text-xl font-semibold">ExamGlow</span>
      </Link>
      {NAV.map((g) => (
        <div key={g.h} className="mt-7">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{g.h}</p>
          <ul className="space-y-0.5">
            {g.items.map(({ label, icon: Icon, to }) => {
              const active = loc.pathname === to;
              return (
                <li key={label}>
                  <Link
                    to={to as "/"}
                    className={"relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition " +
                      (active ? "text-brand font-medium" : "text-foreground/70 hover:bg-muted hover:text-foreground")}
                  >
                    {active && <span className="absolute -left-5 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand" />}
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.7} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div className="mt-auto pt-8 text-xs text-muted-foreground">
        Crafted by <span className="font-semibold text-foreground">shakuro</span>
      </div>
    </aside>
  );
}