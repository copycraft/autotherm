import { notFound } from "next/navigation";

/**
 * Pages are one segment deep, so anything deeper ("/foo/bar", old WordPress
 * paths) is a 404. Without this route such paths fell through to no route at
 * all and the Worker answered 500.
 */
export default function DeeperPath() {
  notFound();
}
