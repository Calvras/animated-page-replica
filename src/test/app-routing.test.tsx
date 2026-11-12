import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

const ROUTES: Array<{ path: string; routeId: string }> = [
  { path: "/", routeId: "/" },
  { path: "/browse", routeId: "/browse" },
  { path: "/programs", routeId: "/programs" },
  { path: "/learn", routeId: "/learn" },
  { path: "/classroom", routeId: "/classroom" },
  { path: "/calendar", routeId: "/calendar" },
  { path: "/forum", routeId: "/forum" },
  { path: "/mentors", routeId: "/mentors" },
  { path: "/students", routeId: "/students" },
  { path: "/challenges", routeId: "/challenges" },
  { path: "/workshops", routeId: "/workshops" },
  { path: "/materials", routeId: "/materials" },
  { path: "/assets", routeId: "/assets" },
  { path: "/downloads", routeId: "/downloads" },
  { path: "/store", routeId: "/store" },
];

describe("App routing", () => {
  it.each(ROUTES)("resolves $path to the $routeId route", ({ path, routeId }) => {
    const matches = router.matchRoutes(path);

    expect(matches.length).toBeGreaterThan(0);
    expect(matches.at(-1)?.routeId).toBe(routeId);
    expect(matches.at(-1)?.status).toBe("success");
  });

  it("matches no child route for an unknown path", () => {
    const matches = router.matchRoutes("/this-page-does-not-exist");

    // An unmatched URL leaves only the root match, so the root notFoundComponent renders.
    expect(matches).toHaveLength(1);
    expect(matches.at(-1)?.routeId).toBe(rootRouteId);
  });

  it("gives every route a distinct id", () => {
    const ids = ROUTES.map((r) => r.routeId);

    expect(new Set(ids).size).toBe(ROUTES.length);
  });
});