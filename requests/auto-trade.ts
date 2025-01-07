import autoTradeService from "@/lib/axios-config";
import { toastErrorHandler } from "@/lib/error-handler";
import { useQuery } from "@tanstack/react-query";

export async function fetchCronHealth() {
  try {
    const { data } = await autoTradeService.get<AutoTrade.CronHealth>(
      "/health"
    );
    return data;
  } catch (error) {
    return toastErrorHandler(error);
  }
}

export async function fetchDecisions({ limit }: { limit?: number }) {
  try {
    const { data } = await autoTradeService.get<{ decisions: AutoTrade.Logs }>(
      "/decisions",
      {
        params: { limit },
      }
    );
    return data.decisions;
  } catch (error) {
    return toastErrorHandler(error);
  }
}

export async function fetchProfit() {
  try {
    const { data } = await autoTradeService.get<AutoTrade.Profit>(
      "/total-rate"
    );
    return data;
  } catch (error) {
    return toastErrorHandler(error);
  }
}

export const useCronHealth = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["auto-trade", "health"],
    queryFn: fetchCronHealth,
    staleTime: 8 * 60 * 1000 * 60,
    refetchInterval: 8 * 60 * 1000 * 60,
  });

  return { data, isLoading };
};

export const useTradingLogs = ({ limit }: { limit?: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["auto-trade", "logs", limit],
    queryFn: () => fetchDecisions({ limit }),
    staleTime: 8 * 60 * 1000 * 60,
    refetchInterval: 8 * 60 * 1000 * 60,
  });

  return { data, isLoading };
};

export const useTradingProfit = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["auto-trade", "profit"],
    queryFn: fetchProfit,
    staleTime: 1000 * 5,
    refetchInterval: 1000 * 5,
  });

  return { data, isLoading };
};
