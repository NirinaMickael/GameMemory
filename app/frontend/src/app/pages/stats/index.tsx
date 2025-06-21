import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BarChart3, TrendingUp, Users, Target } from "lucide-react";
import { useRouter, useTranslation } from "@/common/hooks";
import { WrapperLayout } from "@/components/layout/WrapperLayout";
import { getStat } from "@/features/leaderBoard/services/api/score.api";

type Stats = {
  averageMoves: number;
  totalGames: number;
  bestScore: number;
};

export function StatPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getStat();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mt-3">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t("header.gameTitle")}
          </h1>
          <div className="w-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("cards.totalGames")}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : stats?.totalGames || 0}</div>
              <p className="text-xs text-muted-foreground">{t("cards.totalGamesDesc")}</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("cards.averageMoves")}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : Math.round(stats?.averageMoves || 0)}
              </div>
              <p className="text-xs text-muted-foreground">{t("cards.averageMovesDesc")}</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("cards.bestScore")}</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : stats?.bestScore || 0}</div>
              <p className="text-xs text-muted-foreground">{t("cards.bestScoreDesc")}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>{t("cards.detailedAnalysis")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{t("loading")}</p>
              </div>
            ) : stats?.totalGames === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-4">{t("noData")}</p>
                <Button onClick={() => router.push("/")} className="bg-gradient-to-r from-purple-600 to-blue-600">
                  {t("startPlaying")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">{t("performance.title", "Performance")}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {stats && stats.averageMoves <= 16
                        ? t("performance.excellent")
                        : stats && stats.averageMoves <= 20
                        ? t("performance.good")
                        : t("performance.train")}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">{t("progress")}</h3>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {stats && stats.totalGames >= 10
                        ? t("progression.experienced")
                        : stats && stats.totalGames >= 5
                        ? t("progression.onTrack")
                        : t("progression.beginner")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </WrapperLayout>
  );
}
