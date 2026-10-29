import type { Lang } from "../constants";
import { de } from "./de";
import { en } from "./en";
import { hu } from "./hu";
import { ro } from "./ro";
import type { PharmaDict } from "./types";

export type { PharmaDict };

export const PHARMA_DICTS: Record<Lang, PharmaDict> = { hu, en, de, ro };
