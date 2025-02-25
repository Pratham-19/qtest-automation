"use client";
import { useState, useCallback, useRef } from "react";
import {
  AlertTriangle,
  Download,
  Filter,
  Activity,
  BarChart4,
  ArrowRight,
  GitCompare,
  Target,
  Network,
  Bug,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReleaseDashboard() {
  const analysisRef = useRef(null);
  const [selectedRelease, setSelectedRelease] = useState("miles19.19");
  const [selectedArea, setSelectedArea] = useState(null);

  // Mock data for the release health
  const releaseData = {
    "miles19.19": {
      version: "Miles 19.19",
      status: "DEVELOPMENT",
      health: 76,
      scheduledRelease: "April 15, 2025",
      daysRemaining: 48,
      comparisonRelease: "Miles 19.18",
      fteData: [
        {
          name: "FTE1",
          executed: 480,
          passed: 420,
          failed: 45,
          skipped: 15,
          health: 87,
        },
        {
          name: "FTE2",
          executed: 390,
          passed: 310,
          failed: 55,
          skipped: 25,
          health: 79,
        },
        {
          name: "FTE3",
          executed: 460,
          passed: 395,
          failed: 42,
          skipped: 23,
          health: 85,
        },
        {
          name: "RC",
          executed: 350,
          passed: 290,
          failed: 40,
          skipped: 20,
          health: 82,
        },
      ],
      problemAreas: [
        {
          id: 1,
          name: "Backup Process",
          health: 65,
          escalations: 4,
          features: [
            { name: "Recovery Validation", health: 58, testCasesNeeded: 12 },
            { name: "Backup Authentication", health: 72, testCasesNeeded: 8 },
          ],
        },
        {
          id: 2,
          name: "Data Replication",
          health: 72,
          escalations: 3,
          features: [
            { name: "Replication Failover", health: 68, testCasesNeeded: 9 },
            { name: "Cross-site Recovery", health: 75, testCasesNeeded: 6 },
          ],
        },
        {
          id: 3,
          name: "User Access",
          health: 68,
          escalations: 2,
          features: [
            { name: "RBAC Management", health: 66, testCasesNeeded: 7 },
            { name: "Authentication Flow", health: 70, testCasesNeeded: 5 },
          ],
        },
        {
          id: 4,
          name: "Storage Management",
          health: 70,
          escalations: 2,
          features: [
            { name: "Capacity Planning", health: 72, testCasesNeeded: 6 },
            { name: "Storage Reclamation", health: 68, testCasesNeeded: 8 },
          ],
        },
      ],
      prevReleaseEscalations: [
        { id: 1, feature: "Backup Process", count: 7, severity: "High" },
        { id: 2, feature: "Data Replication", count: 5, severity: "Medium" },
        { id: 3, feature: "User Access", count: 4, severity: "Medium" },
        { id: 4, feature: "Storage Management", count: 3, severity: "Low" },
      ],
    },
    "miles19.18": {
      version: "Miles 19.18",
      status: "RELEASED",
      health: 92,
      releasedDate: "January 10, 2025",
      fteData: [
        {
          name: "FTE1",
          executed: 520,
          passed: 498,
          failed: 15,
          skipped: 7,
          health: 95,
        },
        {
          name: "FTE2",
          executed: 480,
          passed: 452,
          failed: 18,
          skipped: 10,
          health: 94,
        },
        {
          name: "FTE3",
          executed: 510,
          passed: 485,
          failed: 16,
          skipped: 9,
          health: 95,
        },
        {
          name: "RC",
          executed: 410,
          passed: 388,
          failed: 12,
          skipped: 10,
          health: 94,
        },
      ],
    },
  };

  const currentRelease =
    releaseData[selectedRelease] || releaseData["miles19.19"];

  const getHealthColor = (health) => {
    if (health >= 90) return "text-green-600";
    if (health >= 75) return "text-amber-600";
    return "text-red-600";
  };

  const getHealthBadge = (health) => {
    if (health >= 90) return "bg-green-100 text-green-800 hover:bg-green-200";
    if (health >= 75) return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    return "bg-red-100 text-red-800 hover:bg-red-200";
  };

  const getProgressColor = (health) => {
    if (health >= 90) return "bg-green-600";
    if (health >= 75) return "bg-amber-600";
    return "bg-red-600";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "DEVELOPMENT":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "TESTING":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "RELEASED":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  // Handle click on problematic area to show analysis
  const handleAreaClick = useCallback((area) => {
    // Toggle selected area to show details
    setSelectedArea(area);

    // Scroll to the analysis area if needed
    setTimeout(() => {
      const element = document.getElementById("area-analysis");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Release Selection Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Release Health Dashboard</h1>
          <p className="text-muted-foreground">
            Analyzing Miles 19.19 release health and test coverage
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedRelease} onValueChange={setSelectedRelease}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Release" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="miles19.19">Miles 19.19</SelectItem>
              <SelectItem value="miles19.18">Miles 19.18</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="size-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="size-4" />
          </Button>
        </div>
      </div>

      {/* Release Details Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <CardTitle className="text-xl">
                {currentRelease.version}
              </CardTitle>
              <CardDescription>
                {currentRelease.status === "RELEASED"
                  ? `Released on ${currentRelease.releasedDate}`
                  : `Scheduled for ${currentRelease.scheduledRelease} (${currentRelease.daysRemaining} days remaining)`}
              </CardDescription>
            </div>
            <div className="mt-3 flex items-center gap-3 md:mt-0">
              <Badge className={getStatusBadge(currentRelease.status)}>
                {currentRelease.status}
              </Badge>
              <Badge className={getHealthBadge(currentRelease.health)}>
                Health: {currentRelease.health}%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium">Release Health</span>
                <span
                  className={`text-sm font-medium ${getHealthColor(currentRelease.health)}`}
                >
                  {currentRelease.health}%
                </span>
              </div>
              <Progress value={currentRelease.health} className="h-2" />
            </div>

            {currentRelease.comparisonRelease && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                <GitCompare className="size-4 text-blue-600" />
                <span>
                  Comparing with {currentRelease.comparisonRelease} escalations
                  for gap analysis
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* FTE Health Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {currentRelease.fteData.map((fte) => (
          <Card key={fte.name} className="overflow-hidden border">
            <div className={`h-1 w-full ${getProgressColor(fte.health)}`}></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{fte.name}</CardTitle>
                <Badge className={getHealthBadge(fte.health)}>
                  {fte.health}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="flex items-center">
                  <div className="mr-2 size-2 rounded-full bg-blue-500"></div>
                  <span>
                    Executed:{" "}
                    <span className="font-medium">{fte.executed}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 size-2 rounded-full bg-green-500"></div>
                  <span>
                    Passed: <span className="font-medium">{fte.passed}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 size-2 rounded-full bg-red-500"></div>
                  <span>
                    Failed: <span className="font-medium">{fte.failed}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 size-2 rounded-full bg-amber-400"></div>
                  <span>
                    Skipped: <span className="font-medium">{fte.skipped}</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Test Execution Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 size-5" />
            Test Execution Report
          </CardTitle>
          <CardDescription>
            Overview of test execution metrics and comparison with previous
            releases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="execution">
            <TabsList className="mb-4">
              <TabsTrigger value="execution">Execution Stats</TabsTrigger>
              <TabsTrigger value="comparison">Release Comparison</TabsTrigger>
              <TabsTrigger value="trend">Execution Trend</TabsTrigger>
              <TabsTrigger value="coverage">Feature Coverage</TabsTrigger>
            </TabsList>
            <TabsContent value="execution">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Tests
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="text-2xl font-bold">1,680</div>
                    <p className="text-xs text-muted-foreground">
                      Across all FTEs
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Executed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="text-2xl font-bold">1,415</div>
                    <p className="text-xs text-muted-foreground">
                      84.2% completion rate
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pass Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="text-2xl font-bold">82.3%</div>
                    <p className="text-xs text-muted-foreground">
                      1,165 passed tests
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Failed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="text-2xl font-bold">182</div>
                    <p className="text-xs text-muted-foreground">
                      12.8% failure rate
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="comparison">
              <div className="flex h-64 items-center justify-center rounded-md border p-4">
                <div className="text-center">
                  <GitCompare className="mx-auto mb-2 size-10 text-slate-300" />
                  <p className="text-muted-foreground">
                    Comparison chart between Miles 19.19 and 19.18
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Showing test metrics differences between releases
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="trend">
              <div className="flex h-64 items-center justify-center rounded-md border p-4">
                <div className="text-center">
                  <BarChart4 className="mx-auto mb-2 size-10 text-slate-300" />
                  <p className="text-muted-foreground">
                    Daily test execution trend chart
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Showing progress over time for the current release cycle
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="coverage">
              <div className="flex h-64 items-center justify-center rounded-md border p-4">
                <div className="text-center">
                  <Target className="mx-auto mb-2 size-10 text-slate-300" />
                  <p className="text-muted-foreground">
                    Feature coverage heatmap
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Showing test coverage across all features
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Problematic Areas Analysis */}
      <Card className="mb-20">
        <CardHeader className="relative">
          <CardTitle className="flex items-center">
            <Network className="mr-2 size-5" />
            Problem Area Analysis
          </CardTitle>
          <CardDescription>
            Areas requiring attention based on previous release escalations and
            current test results
          </CardDescription>
          <div className="absolute right-5 top-5 opacity-45">
            <ExternalLink size={18} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium">
              Previous Release Escalations (
              {currentRelease.comparisonRelease || "Miles 19.18"})
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {currentRelease.prevReleaseEscalations?.map((item) => (
                <Card key={item.id} className="border">
                  <CardContent className="p-4">
                    <h4 className="font-medium">{item.feature}</h4>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle
                          className={`mr-1 size-4 ${
                            item.severity === "High"
                              ? "text-red-500"
                              : item.severity === "Medium"
                                ? "text-amber-500"
                                : "text-blue-500"
                          }`}
                        />
                        <span className="text-sm">{item.severity}</span>
                      </div>
                      <Badge variant="outline">{item.count} issues</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <h3 className="mb-3 text-sm font-medium">
            Current Release Problematic Areas
          </h3>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {currentRelease.problemAreas?.map((area) => (
              <Card
                key={area.id}
                className={`cursor-pointer border transition-colors hover:border-blue-200`}
                onClick={() => handleAreaClick(area)}
              >
                <CardContent className="p-4">
                  <h4 className="font-medium">{area.name}</h4>
                  <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">Health</span>
                      <span
                        className={`text-sm font-medium ${getHealthColor(area.health)}`}
                      >
                        {area.health}%
                      </span>
                    </div>
                    <Progress value={area.health} className="mb-3 h-1.5" />
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <AlertTriangle className="mr-1 size-4 text-amber-500" />
                        <span>{area.escalations} escalations</span>
                      </div>
                      <ArrowRight className="size-4 text-slate-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Analysis section appears here when an area is selected */}
          <div id="area-analysis" ref={analysisRef}>
            {selectedArea && (
              <Card className="mt-8 border border-blue-200 bg-blue-50/30">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {selectedArea.name} Analysis
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedArea(null)}
                    >
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {selectedArea.features.map((feature, idx) => (
                      <Card key={idx} className="border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {feature.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm">Health</span>
                            <span
                              className={`text-sm font-medium ${getHealthColor(feature.health)}`}
                            >
                              {feature.health}%
                            </span>
                          </div>
                          <Progress
                            value={feature.health}
                            className="mb-2 h-1.5"
                          />
                          <div className="mt-3 flex items-center">
                            <Bug className="mr-2 size-4 text-red-500" />
                            <span className="text-sm">
                              Gap: Need {feature.testCasesNeeded} additional
                              test cases
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button size="sm" className="w-full">
                            Generate Resolution
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
