interface AutotradeCronHealth {
  status: "healthy" | "unhealthy";
  tasks: {
    taskName: string;
    lastExecutionTime: string;
    healthy: boolean;
  }[];
}

interface AutotradeLog {
  timestamp: number;
  decision: string;
  percentage: number;
  reason: string;
  solBalance: number;
  krwBalance: number;
  solAvgBuyPrice: number;
}

interface AutotradeProfit {
  totalInvested: number;
  totalCurrentValue: number;
  profitRate: string;
}

declare namespace AutoTrade {
  type CronHealth = AutotradeCronHealth;
  type Logs = AutotradeLog[];
  type Profit = AutotradeProfit;
}
