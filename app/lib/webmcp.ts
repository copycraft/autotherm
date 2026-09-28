"use client";

import { useEffect, useRef } from "react";

export interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (
    inputs: Record<string, unknown>,
    client?: { requestUserInteraction: () => Promise<boolean> },
  ) => Promise<{ content: { type: string; text: string }[] }>;
  annotations?: { readOnlyHint?: boolean };
}

function getModelContext() {
  if (typeof navigator === "undefined") return null;
  const mc = (navigator as unknown as Record<string, unknown>).modelContext;
  if (!mc || typeof mc !== "object") return null;
  return mc as {
    registerTool: (tool: WebMCPTool) => void;
    unregisterTool: (name: string) => void;
    requestUserInteraction: (opts: {
      type: string;
      title: string;
      description: string;
      action: string;
    }) => Promise<boolean>;
  };
}

export function useWebMCPTool(tool: WebMCPTool) {
  const toolRef = useRef(tool);

  // Keep the latest tool in the ref after commit - never write refs during render.
  useEffect(() => {
    toolRef.current = tool;
  });

  useEffect(() => {
    const ctx = getModelContext();
    if (!ctx) return;
    // Unregister the name we registered, even if the tool is renamed later.
    const registered = toolRef.current;
    try {
      ctx.registerTool(registered);
    } catch {
      /* not supported */
    }
    return () => {
      try {
        ctx.unregisterTool(registered.name);
      } catch {
        /* not supported */
      }
    };
  }, [tool.name]);
}
