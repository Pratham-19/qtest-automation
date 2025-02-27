"use client";
import {
  useState,
  useRef,
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import Link from "next/link";
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
  ExternalLink,
  Database,
  HardDrive,
  Server,
  FileCheck,
  FlaskConical,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  const [selectedRelease, setSelectedRelease] = useState("miles19.19");

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

  const escalationData = {
    nas: {
      name: "NAS Backup & Recovery",
      health: 68,
      escalations: 7,
      details: [
        {
          id: 1,
          title: "Snapshot retention policy not applying correctly",
          severity: "High",
          impactedFeatures: ["Recovery Validation", "Backup Authentication"],
          description:
            "Snapshot policies configured in the UI are not consistently applying to all volumes in multi-node configurations. This is causing retention mismatches and potential data loss scenarios.",
          testCasesNeeded: 5,
          affectedSystems: ["NetApp ONTAP", "Dell EMC Isilon"],
          recommendedAction:
            "Add test cases to verify snapshot policy application across multi-node configurations with different volume types.",
        },
        {
          id: 2,
          title: "NAS restore fails when ACLs contain special characters",
          severity: "Medium",
          impactedFeatures: ["Recovery Validation"],
          description:
            "When restoring NAS data with ACLs containing Unicode or special characters, the restore operation fails with error code BP-NAS-4022.",
          testCasesNeeded: 3,
          affectedSystems: ["All NAS systems"],
          recommendedAction:
            "Develop test cases to verify ACL handling with various character sets during restore operations.",
        },
        {
          id: 3,
          title: "Incremental backups inconsistent after storage migration",
          severity: "Medium",
          impactedFeatures: ["Backup Authentication"],
          description:
            "After migrating NAS storage between clusters, incremental backups fail to identify previously backed up data correctly.",
          testCasesNeeded: 4,
          affectedSystems: ["NetApp ONTAP", "Dell EMC Isilon"],
          recommendedAction:
            "Create test suite for post-migration backup consistency verification.",
        },
      ],
    },
    oracle: {
      name: "Oracle Database",
      health: 72,
      escalations: 5,
      details: [
        {
          id: 4,
          title: "RMAN catalog sync issues on RAC configurations",
          severity: "High",
          impactedFeatures: ["Recovery Validation", "Cross-site Recovery"],
          description:
            "RMAN catalog synchronization fails intermittently when backing up Oracle RAC configurations with multiple instances across different subnets.",
          testCasesNeeded: 6,
          affectedSystems: ["Oracle 19c", "Oracle 21c"],
          recommendedAction:
            "Implement test cases for multi-subnet RAC configurations with varying network latencies.",
        },
        {
          id: 5,
          title: "Tablespace point-in-time recovery fails with ORA-01552",
          severity: "Medium",
          impactedFeatures: ["Recovery Validation"],
          description:
            "Attempts to perform tablespace point-in-time recovery (TSPITR) fail with ORA-01552 when the database uses ASM storage with redundancy.",
          testCasesNeeded: 4,
          affectedSystems: ["Oracle 19c"],
          recommendedAction:
            "Add test cases for TSPITR operations on ASM storage with different redundancy levels.",
        },
      ],
    },
    sap: {
      name: "SAP HANA",
      health: 76,
      escalations: 4,
      details: [
        {
          id: 6,
          title:
            "Log backup truncation not honored during scale-out configurations",
          severity: "High",
          impactedFeatures: ["Backup Authentication", "Cross-site Recovery"],
          description:
            "In SAP HANA scale-out configurations, log backup truncation settings are not consistently applied across all nodes, leading to excessive storage utilization.",
          testCasesNeeded: 4,
          affectedSystems: ["SAP HANA 2.0 SPS05", "SAP HANA 2.0 SPS06"],
          recommendedAction:
            "Create test suite for log backup verification in multi-node HANA deployments with varying node counts.",
        },
      ],
    },
    sql: {
      name: "SQL Server",
      health: 70,
      escalations: 4,
      details: [
        {
          id: 7,
          title:
            "TDE database restore fails when certificate paths contain spaces",
          severity: "Medium",
          impactedFeatures: ["Recovery Validation", "Backup Authentication"],
          description:
            "Transparent Data Encryption (TDE) enabled database restores fail when certificate paths contain spaces or special characters.",
          testCasesNeeded: 3,
          affectedSystems: ["SQL Server 2019", "SQL Server 2022"],
          recommendedAction:
            "Develop test cases for TDE restore operations with various certificate path configurations.",
        },
        {
          id: 8,
          title: "Availability Group backup preference not being respected",
          severity: "Medium",
          impactedFeatures: ["Backup Authentication"],
          description:
            "When configuring backups for SQL Server Availability Groups, the preferred backup replica setting is occasionally ignored during execution.",
          testCasesNeeded: 5,
          affectedSystems: ["SQL Server 2019", "SQL Server 2022"],
          recommendedAction:
            "Create test suite for verifying AG backup preference adherence under various replica states and transitions.",
        },
      ],
    },
    filesystem: {
      name: "File System",
      health: 65,
      escalations: 6,
      details: [
        {
          id: 9,
          title: "VSS writer failures on volumes with deduplication enabled",
          severity: "High",
          impactedFeatures: ["Recovery Validation", "Backup Authentication"],
          description:
            "Volume Shadow Copy Service (VSS) writers fail intermittently on Windows volumes with deduplication enabled, particularly with high change rates.",
          testCasesNeeded: 7,
          affectedSystems: ["Windows Server 2019", "Windows Server 2022"],
          recommendedAction:
            "Implement test cases for VSS operations on deduplicated volumes with varying change rates and file patterns.",
        },
        {
          id: 10,
          title: "Linux LVM snapshot creation failing with thin provisioning",
          severity: "Medium",
          impactedFeatures: ["Backup Authentication"],
          description:
            "LVM snapshot creation fails on Linux systems using thin provisioning when the underlying storage is near capacity thresholds.",
          testCasesNeeded: 4,
          affectedSystems: [
            "RHEL 8.x",
            "RHEL 9.x",
            "Ubuntu 20.04 LTS",
            "Ubuntu 22.04 LTS",
          ],
          recommendedAction:
            "Create test cases for LVM snapshot operations with varying capacity thresholds and thin provisioning configurations.",
        },
      ],
    },
  };

  const currentRelease =
    releaseData[selectedRelease] || releaseData["miles19.19"];

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-600";
    if (health >= 75) return "text-amber-600";
    return "text-red-600";
  };

  const getHealthBadge = (health: number) => {
    if (health >= 90) return "bg-green-100 text-green-800 hover:bg-green-200";
    if (health >= 75) return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    return "bg-red-100 text-red-800 hover:bg-red-200";
  };

  const getProgressColor = (health: number) => {
    if (health >= 90) return "bg-green-600";
    if (health >= 75) return "bg-amber-600";
    return "bg-red-600";
  };

  const getStatusBadge = (status: unknown) => {
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
          <Button asChild className="gap-2  text-white">
            <Link href="/workflow/create">
              <FlaskConical className="size-4" />
              Add Workflow
            </Link>
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
        {currentRelease.fteData.map(
          (fte: {
            name:
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | Promise<AwaitedReactNode>
              | Key
              | null
              | undefined;
            health:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            executed:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            passed:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            failed:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            skipped:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
          }) => (
            <Card key={fte.name} className="overflow-hidden border">
              <div
                className={`h-1 w-full ${getProgressColor(fte.health)}`}
              ></div>
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
                      Skipped:{" "}
                      <span className="font-medium">{fte.skipped}</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ),
        )}
      </div>

      {/* Test Execution Report */}
      <Card>
        <CardHeader className="relative pb-2">
          <CardTitle className="flex items-center">
            <Activity className="mr-2 size-5" />
            Test Execution Report
          </CardTitle>
          <CardDescription>
            Overview of test execution metrics and comparison with previous
            releases
          </CardDescription>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-5 top-5"
          >
            <Filter className="size-4" />
          </Button>
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
        <CardHeader className="relative pb-2">
          <CardTitle className="flex items-center text-xl">
            <Network className="mr-2 size-5" />
            Problem Area Analysis
          </CardTitle>
          <CardDescription className="mt-1">
            Key workflow areas requiring attention based on escalation severity
            and volume
          </CardDescription>
          <Link
            href="/escalation-analysis"
            className="absolute right-5 top-5 transition-opacity hover:opacity-80"
          >
            <Button variant="ghost" size="icon" className="size-8">
              <ExternalLink size={18} />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="mb-6 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(escalationData).map(([key, workflow]) => {
              // Determine color schemes
              let colorScheme;
              switch (key) {
                case "nas":
                  colorScheme = {
                    bg: "bg-blue-50",
                    border: "border-blue-200",
                    icon: "text-blue-600",
                    accent: "bg-blue-600",
                    text: "text-blue-700",
                    badge:
                      workflow.health < 75
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700",
                  };
                  break;
                case "oracle":
                  colorScheme = {
                    bg: "bg-amber-50",
                    border: "border-amber-200",
                    icon: "text-amber-600",
                    accent: "bg-amber-600",
                    text: "text-amber-700",
                    badge:
                      workflow.health < 75
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700",
                  };
                  break;
                case "sap":
                  colorScheme = {
                    bg: "bg-purple-50",
                    border: "border-purple-200",
                    icon: "text-purple-600",
                    accent: "bg-purple-600",
                    text: "text-purple-700",
                    badge:
                      workflow.health < 75
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700",
                  };
                  break;
                case "sql":
                  colorScheme = {
                    bg: "bg-indigo-50",
                    border: "border-indigo-200",
                    icon: "text-indigo-600",
                    accent: "bg-indigo-600",
                    text: "text-indigo-700",
                    badge:
                      workflow.health < 75
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700",
                  };
                  break;
                case "filesystem":
                  colorScheme = {
                    bg: "bg-red-50",
                    border: "border-red-200",
                    icon: "text-red-600",
                    accent: "bg-red-600",
                    text: "text-red-700",
                    badge: "bg-red-100 text-red-700",
                  };
                  break;
                default:
                  colorScheme = {
                    bg: "bg-green-50",
                    border: "border-green-200",
                    icon: "text-green-600",
                    accent: "bg-green-600",
                    text: "text-green-700",
                    badge:
                      workflow.health < 75
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700",
                  };
              }

              // Get appropriate icon
              const getWorkflowIcon = () => {
                switch (key) {
                  case "nas":
                    return <Server className={`size-5 ${colorScheme.icon}`} />;
                  case "oracle":
                    return (
                      <Database className={`size-5 ${colorScheme.icon}`} />
                    );
                  case "sap":
                    return (
                      <Database className={`size-5 ${colorScheme.icon}`} />
                    );
                  case "sql":
                    return (
                      <Database className={`size-5 ${colorScheme.icon}`} />
                    );
                  case "filesystem":
                    return (
                      <HardDrive className={`size-5 ${colorScheme.icon}`} />
                    );
                  default:
                    return (
                      <AlertTriangle className={`size-5 ${colorScheme.icon}`} />
                    );
                }
              };

              // Sample escalation to display one
              const sampleEscalation = workflow.details[0];

              return (
                <Link
                  key={key}
                  href="/escalation-analysis"
                  className="block rounded-lg transition-transform hover:scale-[1.01] focus:scale-[1.01]"
                >
                  <div
                    className={`rounded-lg border ${colorScheme.border} ${colorScheme.bg} overflow-hidden shadow-sm`}
                  >
                    {/* Header with workflow info */}
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getWorkflowIcon()}
                        <h4 className={`font-medium ${colorScheme.text}`}>
                          {workflow.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={colorScheme.badge}>
                          {workflow.health}%
                        </Badge>
                        <Badge variant="outline" className="border-slate-300">
                          {workflow.escalations} issues
                        </Badge>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 w-full bg-white/50">
                      <div
                        className={colorScheme.accent}
                        style={{ width: `${workflow.health}%`, height: "100%" }}
                      ></div>
                    </div>

                    {/* Sample escalation */}
                    {sampleEscalation && (
                      <div className="bg-white/80 px-4 py-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 size-4 text-amber-500" />
                          <div>
                            <p className="line-clamp-1 text-sm font-medium text-slate-700">
                              {sampleEscalation.title}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {sampleEscalation.impactedFeatures
                                .slice(0, 2)
                                .map((feature, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              {sampleEscalation.impactedFeatures.length > 2 && (
                                <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                                  +
                                  {sampleEscalation.impactedFeatures.length - 2}{" "}
                                  more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-2">
                      <span className="text-xs text-slate-500">
                        {workflow.details.length} escalation
                        {workflow.details.length !== 1 ? "s" : ""}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
                        View details
                        <ArrowRight className="size-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
