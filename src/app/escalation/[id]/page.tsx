"use client";
import {
  ArrowLeft,
  FileWarning,
  AlertTriangle,
  CalendarDays,
  Tag,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Users,
  Link as LinkIcon,
  CheckCircle,
  FileCode,
  Database,
  Shield,
  History,
  GitPullRequest,
  BookOpen,
  Bot,
  ExternalLink,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Timeline,
//   TimelineContent,
//   TimelineItem,
//   TimelineSeparator,
//   TimelineDot,
//   TimelineConnector,
// } from "@/components/ui/timeline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams, useRouter } from "next/navigation";

export default function DPRCADetailPage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="flex size-full flex-col overflow-auto">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/escalation">Escalations</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink>{id}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div className="flex items-center gap-2">
              <FileWarning className="size-5 text-red-500" />
              <h1 className="text-2xl font-bold">{id}</h1>
              <Badge variant="destructive">Critical</Badge>
            </div>
          </div>
          <h2 className="mt-2 text-3xl font-bold">
            Authentication Service Failure
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <AlertTriangle className="size-4 text-red-500" />
              <span className="text-sm font-medium">UOM-2453</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="size-4 text-slate-500" />
              <span className="text-sm">Feb 15, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="size-4 text-slate-500" />
              <div className="flex gap-1">
                <Badge variant="outline">Authentication</Badge>
                <Badge variant="outline">Security</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="analysis">Root Cause Analysis</TabsTrigger>

                <TabsTrigger value="related">Related Tests</TabsTrigger>
              </TabsList>

              {/* Summary Tab */}
              <TabsContent value="summary" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Incident Summary</CardTitle>
                    <CardDescription>
                      Overview of the authentication service failure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-semibold">Description</h3>
                      <p className="text-sm text-slate-700">
                        On February 15, 2025, the authentication service
                        experienced a complete outage lasting 47 minutes between
                        14:23 and 15:10 UTC. During this period, users were
                        unable to log in to the system, and existing sessions
                        were terminated. The issue affected all regions and
                        approximately 12,300 users.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold">Impact</h3>
                      <p className="text-sm text-slate-700">
                        The outage resulted in a complete loss of authentication
                        capabilities, preventing users from accessing any
                        protected services. This caused disruption to critical
                        business operations and resulted in an estimated revenue
                        loss of $45,000.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <h4 className="mb-2 text-sm font-medium">Detection</h4>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="size-5 text-amber-500" />
                          <div>
                            <p className="font-medium">Monitoring Alert</p>
                            <p className="text-xs text-slate-500">
                              14:25 UTC (2 min delay)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h4 className="mb-2 text-sm font-medium">Resolution</h4>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="size-5 text-green-500" />
                          <div>
                            <p className="font-medium">Service Restored</p>
                            <p className="text-xs text-slate-500">
                              15:10 UTC (47 min total)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Key Findings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-2">
                        <XCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                        <div>
                          <p className="font-medium">
                            Database Connection Pool Exhaustion
                          </p>
                          <p className="text-sm text-slate-700">
                            The primary cause was a leak in the connection pool
                            that gradually consumed all available database
                            connections.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                        <div>
                          <p className="font-medium">Insufficient Monitoring</p>
                          <p className="text-sm text-slate-700">
                            Connection pool metrics were not being properly
                            monitored, delaying detection of the growing
                            problem.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                        <div>
                          <p className="font-medium">Missing Circuit Breaker</p>
                          <p className="text-sm text-slate-700">
                            The authentication service lacked proper circuit
                            breaking mechanisms to handle database failures
                            gracefully.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Root Cause Analysis Tab */}
              <TabsContent value="analysis" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Root Cause Analysis</CardTitle>
                    <CardDescription>
                      Detailed investigation and findings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        Primary Issue
                      </h3>
                      <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                        <div className="flex items-start gap-3">
                          <Database className="mt-1 size-5 text-red-600" />
                          <div>
                            <h4 className="font-medium text-red-900">
                              Database Connection Pool Exhaustion
                            </h4>
                            <p className="mt-1 text-sm text-red-700">
                              The authentication service experienced a complete
                              failure due to database connection pool
                              exhaustion. All available connections were
                              consumed without being properly released, leading
                              to a deadlock situation where new authentication
                              requests could not be processed.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-semibold">
                        Detailed Analysis
                      </h3>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-start gap-3">
                            <FileCode className="mt-1 size-5 text-blue-600" />
                            <div>
                              <h4 className="font-medium">Code Issue</h4>
                              <p className="mt-1 text-sm text-slate-700">
                                The authentication service was not properly
                                releasing database connections in error
                                scenarios. Specifically, in the{" "}
                                <code>AuthenticationService.java</code> class,
                                connections obtained in the{" "}
                                <code>validateCredentials()</code> method were
                                not being released in the catch block, resulting
                                in connection leaks during exception handling.
                              </p>
                              <div className="mt-3 rounded bg-slate-50 p-3">
                                <pre className="text-xs text-slate-800">
                                  <code>
                                    {`try {
  connection = dataSource.getConnection();
  // Authentication logic
} catch (SQLException e) {
  logger.error("Database error", e);
  // Missing: connection.close()
  throw new AuthenticationException(e);
}`}
                                  </code>
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-start gap-3">
                            <Users className="mt-1 size-5 text-amber-600" />
                            <div>
                              <h4 className="font-medium">Trigger Event</h4>
                              <p className="mt-1 text-sm text-slate-700">
                                The issue was dormant until a related database
                                performance degradation occurred at 14:10 UTC.
                                This caused an increased rate of authentication
                                exceptions, which in turn accelerated the
                                connection pool depletion. Under normal
                                operation, the leak was slow enough to not cause
                                immediate issues, but the spike in exceptions
                                rapidly consumed all available connections.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-start gap-3">
                            <Shield className="mt-1 size-5 text-slate-600" />
                            <div>
                              <h4 className="font-medium">
                                Missing Safeguards
                              </h4>
                              <p className="mt-1 text-sm text-slate-700">
                                Several critical safeguards were absent from the
                                system design:
                              </p>
                              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                                <li>
                                  • No circuit breaker to prevent cascade
                                  failures
                                </li>
                                <li>
                                  • Inadequate connection pool metrics
                                  monitoring
                                </li>
                                <li>• No automated recovery mechanism</li>
                                <li>
                                  • Connection timeout settings were too
                                  generous (10 minutes)
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-semibold">
                        Technical Root Cause
                      </h3>
                      <div className="flex flex-col gap-4 rounded-lg border p-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                            <h4 className="font-medium text-amber-800">
                              Contributing Factors
                            </h4>
                            <ul className="mt-2 space-y-1 text-sm text-amber-700">
                              <li>
                                • Database connection leak in error handling
                              </li>
                              <li>
                                • Oversized connection pool (500 connections)
                              </li>
                              <li>• No connection leak detection mechanism</li>
                              <li>• No automated pool recovery</li>
                            </ul>
                          </div>
                          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                            <h4 className="font-medium text-blue-800">
                              System Configuration
                            </h4>
                            <ul className="mt-2 space-y-1 text-sm text-blue-700">
                              <li>• HikariCP connection pool</li>
                              <li>• PostgreSQL 13.4 database</li>
                              <li>• Spring Boot 2.6.2 application</li>
                              <li>• Kubernetes deployment with 6 replicas</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-2">
                          <h4 className="font-medium">Stack Trace</h4>
                          <div className="mt-2 max-h-40 overflow-auto rounded bg-slate-800 p-3 text-xs text-slate-100">
                            <pre>
                              {`java.sql.SQLException: Connection is not available, request timed out after 600000ms.
    at com.zaxxer.hikari.pool.HikariPool.createTimeoutException(HikariPool.java:696)
    at com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:187)
    at com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:147)
    at com.zaxxer.hikari.HikariDataSource.getConnection(HikariDataSource.java:100)
    at com.company.auth.service.AuthenticationServiceImpl.validateCredentials(AuthenticationServiceImpl.java:87)
    at com.company.auth.controller.AuthController.authenticate(AuthController.java:43)
    at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(Unknown Source)
    at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(Unknown Source)`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="gap-2">
                      <History className="size-4" />
                      <span>View Previous Versions</span>
                    </Button>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                      <Bot className="size-4" />
                      <span>AI Analysis</span>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Related Tests Tab */}
              <TabsContent value="related" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Related Test Cases</CardTitle>
                      <CardDescription>
                        Tests related to this DPRCA
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <GitPullRequest className="size-4" />
                      <span>Request New Test</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">Test ID</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="w-[120px]">Type</TableHead>
                          <TableHead className="w-[120px]">Status</TableHead>
                          <TableHead className="w-[100px] text-right">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            TEST-2453-1
                          </TableCell>
                          <TableCell>
                            Authentication service connection pool exhaustion
                            test
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Regression</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">Passed</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            TEST-2453-2
                          </TableCell>
                          <TableCell>
                            Database connection leak detection in error
                            scenarios
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Integration</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">Passed</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            TEST-2453-3
                          </TableCell>
                          <TableCell>
                            Circuit breaker implementation validation
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Unit</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="destructive">In Progress</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            TEST-2453-4
                          </TableCell>
                          <TableCell>
                            Authentication service resilience under database
                            failures
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Performance</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="destructive">Failed</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            TEST-2453-5
                          </TableCell>
                          <TableCell>
                            Connection pool metrics monitoring alert
                            verification
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">E2E</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">Pending</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      5 tests related to this DPRCA
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <BookOpen className="size-4" />
                      <span>Test Documentation</span>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Action Panel */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-2">
                <Button
                  className="w-full justify-start gap-2"
                  variant="default"
                >
                  <Bot className="size-4" />
                  <span>AI Analysis</span>
                </Button>
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <GitPullRequest className="size-4" />
                  <span>Create Test Case</span>
                </Button>
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <MessageSquare className="size-4" />
                  <span>Add Comment</span>
                </Button>
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <LinkIcon className="size-4" />
                  <span>Link Issue</span>
                </Button>
              </CardContent>
            </Card>

            {/* Status Panel */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Status</CardTitle>
              </CardHeader>
              <CardContent className="pb-3 pt-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Status</span>
                    <Badge variant="outline">Closed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Resolution</span>
                    <Badge variant="default">Fixed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Priority</span>
                    <Badge variant="destructive">P1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Severity</span>
                    <Badge>SEV1</Badge>
                  </div>
                </div>
                <div className="mt-5 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Reported</span>
                    <span className="text-sm">Feb 15, 2025</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-slate-600">Resolved</span>
                    <span className="text-sm">Feb 16, 2025</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-slate-600">Time to fix</span>
                    <span className="text-sm font-medium">26 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fix Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Fix Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-3">
                <div>
                  <h3 className="text-sm font-medium text-slate-800">
                    Pull Request
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <GitPullRequest className="size-4 text-green-600" />
                    <a href="#" className="text-blue-600 hover:underline">
                      PR-3421: Fix connection leak in auth service
                    </a>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <h3 className="text-sm font-medium text-slate-800">
                    Fix Scope
                  </h3>
                  <div className="mt-2 space-y-2 text-sm text-slate-600">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 size-3.5 text-green-600" />
                      <span>Fixed connection leak in error paths</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 size-3.5 text-green-600" />
                      <span>Added connection pool metrics monitoring</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 size-3.5 text-green-600" />
                      <span>Implemented circuit breaker pattern</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 size-3.5 text-green-600" />
                      <span>Added connection leak detection</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <h3 className="text-sm font-medium text-slate-800">
                    Validation
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-slate-600">Unit Tests</span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      21 passed
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Integration Tests
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      8 passed
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-slate-600">Load Tests</span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      Passed
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* People */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">People</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-sm font-medium text-blue-600">
                        JS
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">James Smith</p>
                      <p className="text-xs text-slate-500">SRE Team Lead</p>
                    </div>
                  </div>
                  <Badge variant="outline">Reporter</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-amber-100">
                      <span className="text-sm font-medium text-amber-600">
                        AR
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Ana Rodriguez</p>
                      <p className="text-xs text-slate-500">Senior Developer</p>
                    </div>
                  </div>
                  <Badge variant="outline">Assignee</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-green-100">
                      <span className="text-sm font-medium text-green-600">
                        TC
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tom Chen</p>
                      <p className="text-xs text-slate-500">
                        Database Specialist
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Collaborator</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-purple-100">
                      <span className="text-sm font-medium text-purple-600">
                        KL
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Karen Lee</p>
                      <p className="text-xs text-slate-500">QA Engineer</p>
                    </div>
                  </div>
                  <Badge variant="outline">Validator</Badge>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full gap-1">
                  <Users className="size-4" />
                  <span>Add People</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
