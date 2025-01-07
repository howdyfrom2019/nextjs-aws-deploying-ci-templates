"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useCronHealth,
  useTradingLogs,
  useTradingProfit,
} from "@/requests/auto-trade";
import {
  Activity,
  AlertCircle,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const { data: healthData, isLoading: healthLoading } = useCronHealth();
  const { data: logsData, isLoading: logsLoading } = useTradingLogs({
    limit: 10,
  });
  const { data: profitData, isLoading: profitLoading } = useTradingProfit();

  const formatKRW = (value: number) =>
    new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(value);

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">자동매매 대시보드</h1>
        {healthData && (
          <Badge
            variant={
              healthData.status === "healthy" ? "default" : "destructive"
            }
          >
            {healthData.status === "healthy" ? "정상 작동중" : "오류 발생"}
          </Badge>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* 총 투자금 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">총 투자금</CardTitle>
            <CircleDollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profitLoading
                ? "로딩중..."
                : formatKRW(profitData?.totalInvested || 0)}
            </div>
          </CardContent>
        </Card>

        {/* 현재 가치 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">현재 가치</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profitLoading
                ? "로딩중..."
                : formatKRW(profitData?.totalCurrentValue || 0)}
            </div>
          </CardContent>
        </Card>

        {/* 수익률 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">수익률</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profitLoading ? (
                "로딩중..."
              ) : (
                <span
                  className={
                    profitData?.profitRate.startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {profitData?.profitRate}%
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Health */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">시스템 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthLoading ? (
              <div>로딩중...</div>
            ) : (
              healthData?.tasks.map((task) => (
                <div
                  key={task.taskName}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <AlertCircle
                      className={`w-4 h-4 ${
                        task.healthy ? "text-green-500" : "text-red-500"
                      }`}
                    />
                    <span className="font-medium">{task.taskName}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    마지막 실행:{" "}
                    {new Date(task.lastExecutionTime).toLocaleString("ko-KR")}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">최근 거래 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <div className="space-y-4">
              {logsLoading ? (
                <div>로딩중...</div>
              ) : (
                logsData?.map((log, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <Badge
                        variant={
                          log.decision === "buy" ? "default" : "secondary"
                        }
                      >
                        {log.decision === "buy" ? "매수" : "매도"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString("ko-KR")}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>SOL 잔액: {log.solBalance}</div>
                      <div>KRW 잔액: {formatKRW(log.krwBalance)}</div>
                      <div>변동률: {log.percentage}%</div>
                      <div>평균 매수가: {formatKRW(log.solAvgBuyPrice)}</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {log.reason}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
