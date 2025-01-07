"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getQueryClient } from "@/lib/query-util";
import ModalContextProvider from "@/providers/client/modal-context";
import {
  fetchCronHealth,
  fetchDecisions,
  fetchProfit,
} from "@/requests/auto-trade";
import {
  dehydrate,
  HydrationBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"system"}
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position={"top-right"} />
          <TooltipProvider delayDuration={0}>
            <ModalContextProvider>{children}</ModalContextProvider>
          </TooltipProvider>
        </ThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
