import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { createBrowserHistory, parseHref } from "@tanstack/history";
import { routeTree } from "./routeTree.gen";

function createBaseAwareHistory() {
  if (typeof window === "undefined") return undefined;

  const base = import.meta.env.BASE_URL;
  if (base === "/") return undefined;

  const basePath = base.endsWith("/") ? base.slice(0, -1) : base;
  if (!basePath) return undefined;

  return createBrowserHistory({
    parseLocation: () => {
      const full = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const stripped =
        full === basePath || full.startsWith(`${basePath}/`) || full.startsWith(`${basePath}?`)
          ? full.slice(basePath.length) || "/"
          : full;
      return parseHref(stripped, window.history.state);
    },
    createHref: (path) => {
      const p = path.startsWith("/") ? path : `/${path}`;
      if (p === "/") return `${basePath}/`;
      return `${basePath}${p}`;
    },
  });
}

export const getRouter = () => {
  const queryClient = new QueryClient();
  const history = createBaseAwareHistory();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ...(history ? { history } : {}),
  });

  return router;
};
