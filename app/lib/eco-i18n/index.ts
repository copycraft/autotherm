import type { Lang } from "../constants";
import { de } from "./de";
import { en } from "./en";
import { hu } from "./hu";
import { ro } from "./ro";
import type { EcoDict } from "./types";

export type { EcoDict };

export const ECO_DICTS: Record<Lang, EcoDict> = { hu, en, de, ro };
