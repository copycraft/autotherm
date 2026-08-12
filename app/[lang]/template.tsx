import { ViewTransition, type ReactNode } from "react";

/**
 * Page-transition boundary.
 *
 * A template (unlike a layout) is remounted on every navigation, which is what
 * gives React's <ViewTransition> a genuine enter/exit pair to animate — inside
 * a layout the children merely update and nothing fires.
 *
 * The animation itself lives in globals.css under `.page-enter` / `.page-exit`.
 */
export default function LangTemplate({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      {children}
    </ViewTransition>
  );
}
