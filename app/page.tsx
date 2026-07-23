import { redirect } from "next/navigation";

/** Root - the site lives under localized prefixes; Hungarian is the default. */
export default function RootPage() {
  redirect("/hu");
}
