"use client";
import { useState } from "react";
import {
  Clock,
  ExternalLink,
  Filter,
  Bot,
  LayoutList,
  LayoutGrid,
  AlertTriangle,
  ServerCrash,
  DatabaseBackup,
  ArrowLeftRight,
  Database,
  Timer,
  CheckCircle2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function EscalationPage() {
  const [activeTab, setActiveTab] = useState("dprca");
  const [viewMode, setViewMode] = useState("cards");

  const dprcaItems = [
    {
      id: "PPDMESC-6114",
      title:
        "The server sync job is cancelled because the job ran longer than the expected completion time",
      description:
        "Sync job hangs when exceptions occur which are not caught. One error seen was a login error.",
      product: "PPDM",
      type: "Standalone",
      customer: "Landis GYR",
      uom: "DP-PPDM-Business-Continuity",
      severity: "P02",
      classification: "Development - Functional",
      introduction: "Regression",
      version: "Miles 19.16",
      batch: "CY24B05 - May 14",
      sprint: "Miles Sprint 02 - 2025Jan08",
      date: "2025-01-15",
      status: "Closed",
      resolution: "Done",
      circumstances:
        "Customer has an environment configured for bi-directional Quick Recovery. Some sync loads are heavy – e.g. one had 50,000+ copies to sync which took over an hour and twenty minutes to complete.",
      icon: ServerCrash,
    },
    {
      id: "PPDMESC-5979",
      title: "Database backup failure during high load operations",
      description:
        "Database backup operation fails with timeout errors during peak processing times.",
      product: "PPDM",
      type: "Cluster",
      customer: "Global Energy Inc.",
      uom: "DP-PPDM-Infrastructure",
      severity: "P01",
      classification: "Development - Performance",
      introduction: "New Feature",
      version: "Miles 19.14",
      batch: "CY24B03 - March 10",
      sprint: "Miles Sprint 06 - 2024Dec01",
      date: "2024-12-05",
      status: "In Progress",
      resolution: "Pending",
      circumstances:
        "Customer environment experiencing heavy database load during scheduled backup windows. Transaction logs growing beyond expected size.",
      icon: DatabaseBackup,
    },
    {
      id: "PPDMESC-6023",
      title: "Bidirectional synchronization fails with network timeout",
      description:
        "Bidirectional sync operations timeout after 45 minutes with no data transferred.",
      product: "PPDM",
      type: "Distributed",
      customer: "Pacific Northwest Utilities",
      uom: "DP-PPDM-Network-Operations",
      severity: "P02",
      classification: "Development - Network",
      introduction: "Configuration Change",
      version: "Miles 19.15",
      batch: "CY24B04 - April 12",
      sprint: "Miles Sprint 10 - 2025Jan22",
      date: "2025-01-25",
      status: "Resolved",
      resolution: "Fixed",
      circumstances:
        "Customer operates across multiple datacenters with varying network latency. Synchronization jobs attempt to transfer large volumes of time-series data.",
      icon: ArrowLeftRight,
    },
    {
      id: "PPDMESC-6201",
      title: "Database connection pool exhaustion during parallel operations",
      description:
        "Connection pool depleted causing application-wide timeout errors.",
      product: "PPDM",
      type: "Standalone",
      customer: "Metro Energy Solutions",
      uom: "DP-PPDM-Database",
      severity: "P01",
      classification: "Development - Database",
      introduction: "Scalability Issue",
      version: "Miles 19.16",
      batch: "CY24B05 - May 14",
      sprint: "Miles Sprint 04 - 2025Feb02",
      date: "2025-02-10",
      status: "In Progress",
      resolution: "Pending",
      circumstances:
        "High-scale deployment with over 200 concurrent users. System attempting to process multiple batch operations simultaneously.",
      icon: Database,
    },
  ];

  const escalationItems = [
    {
      id: "ESC-2453",
      title: "Critical data loss during system failover",
      severity: "SEV1",
      product: "PPDM",
      customer: "Landis GYR",
      reported: "2025-02-16",
      status: "Active",
      timeRemaining: "12 hours",
    },
    {
      id: "ESC-2441",
      title: "Performance degradation in high-volume environments",
      severity: "SEV2",
      product: "PPDM",
      customer: "Global Energy Inc.",
      reported: "2025-02-10",
      status: "Active",
      timeRemaining: "36 hours",
    },
    {
      id: "ESC-2438",
      title: "Authentication service intermittent failures",
      severity: "SEV2",
      product: "PPDM",
      customer: "Pacific Northwest Utilities",
      reported: "2025-02-05",
      status: "Resolved",
      timeRemaining: "Completed",
    },
  ];

  return (
    <div className="flex size-full flex-col">
      <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-sm">
        {/* Fixed Header Section */}
        <div className="flex-none">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/escalation">Escalations</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Escalations</h1>
              <p className="text-muted-foreground">
                View and manage escalations and DPRCA reports
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className={viewMode === "cards" ? "bg-blue-50" : ""}
                onClick={() => setViewMode("cards")}
              >
                <LayoutGrid className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={viewMode === "list" ? "bg-blue-50" : ""}
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="size-5" />
              </Button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-2.5 top-2.5 size-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="search"
                placeholder="Search by ID, title, product..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="size-4" />
              Filter
            </Button>
          </div>
        </div>
        {/*  Content Section */}
        <Tabs
          defaultValue="dprca"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex min-h-0 grow flex-col"
        >
          {/* Tabs Headers */}
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="dprca" className="relative">
              DPRCA
              <Badge className="ml-2 px-1.5 py-0.5">{dprcaItems.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="escalations" className="relative">
              Escalations
              <Badge className="ml-2 px-1.5 py-0.5">
                {escalationItems.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* DPRCA Tab */}
          <TabsContent
            value="dprca"
            className="mt-0 min-h-0 grow overflow-auto"
          >
            {viewMode === "cards" ? (
              <div className="grid gap-6 pb-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {dprcaItems.map((item) => (
                  <Card key={item.id} className="flex flex-col overflow-hidden">
                    <CardHeader className="flex-none bg-slate-50 pb-3">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            item.severity === "P01"
                              ? "destructive"
                              : item.severity === "P02"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {item.severity}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <item.icon className="size-5 text-slate-700" />
                        <CardTitle className="text-base font-medium text-primary">
                          {item.id}
                        </CardTitle>
                      </div>
                      <CardDescription className="mt-1 line-clamp-2">
                        {item.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grow pt-4">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Product:
                          </span>
                          <span className="font-medium">{item.product}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">UoM:</span>
                          <span className="max-w-[70%] truncate text-right">
                            {item.uom}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Customer:
                          </span>
                          <span>{item.customer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Version:
                          </span>
                          <span>{item.version}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Classification:
                          </span>
                          <span className="max-w-[70%] truncate text-right">
                            {item.classification}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sprint:</span>
                          <span className="max-w-[70%] truncate text-right">
                            {item.sprint}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="mt-auto flex flex-none justify-between border-t bg-slate-50 p-3">
                      <Link
                        href={`/escalation/${item.id}`}
                        className={buttonVariants({
                          className: "gap-1 text-xs",
                          variant: "ghost",
                          size: "sm",
                        })}
                      >
                        <ExternalLink className="size-3.5" />
                        <span>View Details</span>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-xs"
                      >
                        <Bot className="size-3.5" />
                        <span>AI Analysis</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="h-full overflow-auto rounded-md border bg-white">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-white">
                    <TableRow>
                      <TableHead className="w-[180px]">RCA ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>UoM</TableHead>
                      <TableHead className="w-[100px]">Priority</TableHead>
                      <TableHead className="w-[120px]">Version</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[120px] text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dprcaItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell className="max-w-md">
                          <div className="line-clamp-1">{item.title}</div>
                        </TableCell>
                        <TableCell className="max-w-[180px]">
                          <div className="truncate">{item.uom}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.severity === "P01"
                                ? "destructive"
                                : item.severity === "P02"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {item.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.version}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "Closed"
                                ? "outline"
                                : item.status === "Resolved"
                                  ? "default"
                                  : "default"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <ExternalLink className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <Bot className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Escalations Tab */}
          <TabsContent
            value="escalations"
            className="mt-0 min-h-0 grow overflow-auto"
          >
            {viewMode === "cards" ? (
              <div className="grid gap-6 pb-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {escalationItems.map((item) => (
                  <Card key={item.id} className="flex flex-col overflow-hidden">
                    <CardHeader
                      className={`flex-none pb-3 ${
                        item.severity === "SEV1"
                          ? "bg-red-50"
                          : item.severity === "SEV2"
                            ? "bg-amber-50"
                            : "bg-blue-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            item.severity === "SEV1"
                              ? "destructive"
                              : item.severity === "SEV2"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {item.severity}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <AlertTriangle
                          className={`size-5 ${
                            item.severity === "SEV1"
                              ? "text-red-500"
                              : item.severity === "SEV2"
                                ? "text-amber-500"
                                : "text-blue-500"
                          }`}
                        />
                        <CardTitle className="text-base font-medium text-primary">
                          {item.id}
                        </CardTitle>
                      </div>
                      <CardDescription className="mt-1 line-clamp-2">
                        {item.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grow pt-4">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Product:
                          </span>
                          <span className="font-medium">{item.product}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Customer:
                          </span>
                          <span>{item.customer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Reported:
                          </span>
                          <span>{item.reported}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Time remaining:
                          </span>
                          <div className="flex items-center gap-1">
                            {item.status === "Active" ? (
                              <>
                                <Clock className="size-4 text-amber-500" />
                                <span className="text-amber-700">
                                  {item.timeRemaining}
                                </span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="size-4 text-green-500" />
                                <span className="text-green-700">
                                  Completed
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="mt-auto flex flex-none justify-between border-t bg-slate-50 p-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-xs"
                      >
                        <ExternalLink className="size-3.5" />
                        <span>View Details</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-xs"
                      >
                        <Timer className="size-3.5" />
                        <span>Track Progress</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="h-full overflow-auto rounded-md border bg-white">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-white">
                    <TableRow>
                      <TableHead className="w-[150px]">Escalation ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="w-[100px]">Severity</TableHead>
                      <TableHead className="w-[150px]">Customer</TableHead>
                      <TableHead className="w-[120px]">Reported</TableHead>
                      <TableHead className="w-[150px]">
                        Time Remaining
                      </TableHead>
                      <TableHead className="w-[120px] text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {escalationItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell className="max-w-md">
                          <div className="line-clamp-1">{item.title}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.severity === "SEV1"
                                ? "destructive"
                                : item.severity === "SEV2"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {item.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.customer}</TableCell>
                        <TableCell>{item.reported}</TableCell>
                        <TableCell>
                          {item.status === "Active" ? (
                            <div className="flex items-center gap-1">
                              <Clock className="size-4 text-amber-500" />
                              <span>{item.timeRemaining}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="size-4 text-green-500" />
                              <span>Completed</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <ExternalLink className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <Timer className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
