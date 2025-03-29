import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./route-tree.gen";

const router = createRouter({
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
