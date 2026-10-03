import { de } from "./de";
import { en } from "./en";
import { hu } from "./hu";
import { ro } from "./ro";
import type { HearseDict } from "./types";
import type { Lang } from "../constants";

export type { HearseDict };

export const HEARSE_DICTS: Record<Lang, HearseDict> = { hu, en, de, ro };
