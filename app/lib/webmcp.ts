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
  toolRef.current = tool;

  useEffect(() => {
    const ctx = getModelContext();
    if (!ctx) return;
    try {
      ctx.registerTool(toolRef.current);
    } catch {
      /* not supported */
    }
    return () => {
      try {
        ctx.unregisterTool(toolRef.current.name);
      } catch {
        /* not supported */
      }
    };
  }, [tool.name]);
}
