"use client";
import { useState } from "react";
import {
  AlertTriangle,
  FileText,
  Server,
  Database,
  HardDrive,
  FileCode,
  FileJson,
  ShieldAlert,
  RefreshCw,
  CheckCircle2,
  Wrench,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EscalationDetails() {
  const [selectedEscalation, setSelectedEscalation] = useState(null);
  const [generatedSolution, setGeneratedSolution] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("nas");

  // Example escalation data grouped by workflow
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

  const getWorkflowIcon = (workflow) => {
    switch (workflow) {
      case "nas":
        return <Server className="size-5" />;
      case "oracle":
        return <Database className="size-5" />;
      case "sap":
        return <FileJson className="size-5" />;
      case "sql":
        return <Database className="size-5" />;
      case "filesystem":
        return <HardDrive className="size-5" />;
      default:
        return <FileCode className="size-5" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "text-red-500 bg-red-50";
      case "Medium":
        return "text-amber-500 bg-amber-50";
      case "Low":
        return "text-blue-500 bg-blue-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const getHealthColor = (health) => {
    if (health >= 90) return "text-green-600";
    if (health >= 75) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = (health) => {
    if (health >= 90) return "bg-green-600";
    if (health >= 75) return "bg-amber-600";
    return "bg-red-600";
  };

  const handleGenerateSolution = () => {
    if (!selectedEscalation) return;

    setIsGenerating(true);

    // Simulate solution generation
    setTimeout(() => {
      setGeneratedSolution({
        testCases: [
          {
            id: `TC-${selectedEscalation.id}-001`,
            name: `Verify ${selectedEscalation.title} - Basic Scenario`,
            steps: [
              "Setup test environment with affected systems",
              "Configure test parameters based on escalation criteria",
              "Execute backup operation with relevant parameters",
              "Verify operation outcome against expected results",
              "Document any variations from expected behavior",
            ],
          },
          {
            id: `TC-${selectedEscalation.id}-002`,
            name: `Verify ${selectedEscalation.title} - Edge Cases`,
            steps: [
              "Configure system with boundary values",
              "Execute operation under high load conditions",
              "Validate behavior during expected failure scenarios",
              "Document recovery behavior and system responses",
            ],
          },
          {
            id: `TC-${selectedEscalation.id}-003`,
            name: `Verify ${selectedEscalation.title} - Integration Points`,
            steps: [
              "Identify all integration points affected by the issue",
              "Test each integration point with valid and invalid configurations",
              "Document system behavior at each integration point",
              "Validate error handling and recovery mechanisms",
            ],
          },
        ],
        recommendations: [
          `Review and update test coverage for ${selectedEscalation.impactedFeatures.join(", ")}`,
          `Add monitoring for ${selectedEscalation.title} conditions in CI pipeline`,
          `Create automation scripts to regularly validate this functionality`,
          `Update documentation to include troubleshooting steps for this scenario`,
        ],
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Escalation Analysis</h1>
          <p className="text-muted-foreground">
            Detailed information on problematic areas by workflow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export Report
          </Button>
          <Button size="sm">Create Test Plan</Button>
        </div>
      </div>

      {/* Workflow Tabs */}
      <Tabs
        defaultValue="nas"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4 w-full justify-start overflow-x-auto">
          <TabsTrigger value="nas" className="flex items-center gap-1">
            <Server className="size-4" /> NAS
          </TabsTrigger>
          <TabsTrigger value="oracle" className="flex items-center gap-1">
            <Database className="size-4" /> Oracle
          </TabsTrigger>
          <TabsTrigger value="sap" className="flex items-center gap-1">
            <FileJson className="size-4" /> SAP HANA
          </TabsTrigger>
          <TabsTrigger value="sql" className="flex items-center gap-1">
            <Database className="size-4" /> SQL Server
          </TabsTrigger>
          <TabsTrigger value="filesystem" className="flex items-center gap-1">
            <HardDrive className="size-4" /> File System
          </TabsTrigger>
        </TabsList>

        {Object.keys(escalationData).map((workflow) => (
          <TabsContent key={workflow} value={workflow} className="m-0">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getWorkflowIcon(workflow)}
                    <CardTitle>
                      {escalationData[workflow].name} Escalations
                    </CardTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${getHealthColor(
                      escalationData[workflow].health,
                    )} border-current`}
                  >
                    Health: {escalationData[workflow].health}%
                  </Badge>
                </div>
                <CardDescription>
                  {escalationData[workflow].escalations} escalations requiring
                  attention in this workflow
                </CardDescription>
                <div className="mt-2">
                  <Progress
                    value={escalationData[workflow].health}
                    className={`h-2 ${getProgressColor(
                      escalationData[workflow].health,
                    )}`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {escalationData[workflow].details.map((escalation) => (
                    <Card
                      key={escalation.id}
                      className="overflow-hidden border border-gray-200 transition-all hover:border-blue-200 hover:shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${getSeverityColor(
                                escalation.severity,
                              )}`}
                            >
                              <AlertTriangle className="size-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="font-medium">
                                  {escalation.title}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className={`mt-1 w-fit ${getSeverityColor(
                                    escalation.severity,
                                  )}`}
                                >
                                  {escalation.severity} Severity
                                </Badge>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {escalation.impactedFeatures.map(
                                  (feature, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="secondary"
                                      className="bg-primary hover:bg-blue-100"
                                    >
                                      {feature}
                                    </Badge>
                                  ),
                                )}
                              </div>
                              <div className="mt-3 flex items-center text-sm text-muted-foreground">
                                <ShieldAlert className="mr-1 size-4" />
                                <span>
                                  {escalation.testCasesNeeded} test cases needed
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex border-t sm:border-l sm:border-t-0">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                className="flex h-full w-full items-center justify-center gap-2 rounded-none px-4 hover:bg-blue-50 sm:w-28"
                                onClick={() =>
                                  setSelectedEscalation(escalation)
                                }
                              >
                                <FileText className="size-4" />
                                <span>Details</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 text-xl">
                                  <AlertTriangle
                                    className={`size-5 ${
                                      escalation.severity === "High"
                                        ? "text-red-500"
                                        : escalation.severity === "Medium"
                                          ? "text-amber-500"
                                          : "text-blue-500"
                                    }`}
                                  />
                                  Escalation #{escalation.id}
                                </DialogTitle>
                              </DialogHeader>

                              <div className="mt-2 overflow-y-auto pr-1">
                                <h3 className="text-lg font-medium">
                                  {escalation.title}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className={`mt-2 ${getSeverityColor(
                                    escalation.severity,
                                  )}`}
                                >
                                  {escalation.severity} Severity
                                </Badge>

                                <div className="mt-4">
                                  <h4 className="font-medium">Description</h4>
                                  <p className="mt-1 text-sm">
                                    {escalation.description}
                                  </p>
                                </div>

                                <div className="mt-4">
                                  <h4 className="font-medium">
                                    Impacted Features
                                  </h4>
                                  <div className="mt-1 flex flex-wrap gap-2">
                                    {escalation.impactedFeatures.map(
                                      (feature, idx) => (
                                        <Badge key={idx} className="bg-primary">
                                          {feature}
                                        </Badge>
                                      ),
                                    )}
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <h4 className="font-medium">
                                    Affected Systems
                                  </h4>
                                  <div className="mt-1 flex flex-wrap gap-2">
                                    {escalation.affectedSystems.map(
                                      (system, idx) => (
                                        <Badge variant="outline" key={idx}>
                                          {system}
                                        </Badge>
                                      ),
                                    )}
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <h4 className="font-medium">
                                    Recommended Action
                                  </h4>
                                  <p className="mt-1 text-sm">
                                    {escalation.recommendedAction}
                                  </p>
                                </div>

                                {/* Generated Solutions Section */}
                                {generatedSolution ? (
                                  <div className="mt-6 rounded-md border border-green-100 bg-green-50/30 p-4">
                                    <div className="mb-4 flex items-center justify-between">
                                      <h4 className="flex items-center gap-2 font-medium text-green-700">
                                        <CheckCircle2 className="size-5 text-green-600" />
                                        AI Generated Solution
                                      </h4>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          setGeneratedSolution(null)
                                        }
                                      >
                                        Reset
                                      </Button>
                                    </div>

                                    <div className="mb-4">
                                      <h5 className="text-sm font-medium text-green-800">
                                        Recommended Test Cases
                                      </h5>
                                      <div className="mt-2 space-y-3">
                                        {generatedSolution.testCases.map(
                                          (tc) => (
                                            <Card
                                              key={tc.id}
                                              className="border border-gray-200"
                                            >
                                              <CardHeader className="p-3 pb-0">
                                                <div className="flex items-center justify-between">
                                                  <CardTitle className="text-sm font-medium">
                                                    {tc.id}: {tc.name}
                                                  </CardTitle>
                                                </div>
                                              </CardHeader>
                                              <CardContent className="p-3">
                                                <ol className="ml-4 list-decimal text-sm text-gray-600">
                                                  {tc.steps.map((step, idx) => (
                                                    <li
                                                      key={idx}
                                                      className="mt-1"
                                                    >
                                                      {step}
                                                    </li>
                                                  ))}
                                                </ol>
                                              </CardContent>
                                            </Card>
                                          ),
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <h5 className="text-sm font-medium text-green-800">
                                        Additional Recommendations
                                      </h5>
                                      <ul className="ml-4 mt-2 list-disc text-sm text-gray-600">
                                        {generatedSolution.recommendations.map(
                                          (rec, idx) => (
                                            <li key={idx} className="mt-1">
                                              {rec}
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="mt-6">
                                    <Button
                                      onClick={handleGenerateSolution}
                                      className="w-full"
                                      disabled={isGenerating}
                                    >
                                      {isGenerating ? (
                                        <>
                                          <RefreshCw className="mr-2 size-4 animate-spin" />
                                          Generating Solution...
                                        </>
                                      ) : (
                                        <>
                                          <Wrench className="mr-2 size-4" />
                                          Generate Solution Using AI
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
