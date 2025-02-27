"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Plus,
  Workflow,
  FileText,
  RefreshCw,
  Layers,
  CheckCircle2,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define form validation schema with Zod
const workflowFormSchema = z.object({
  workflowName: z.string().min(3, {
    message: "Workflow name must be at least 3 characters.",
  }),
  workflowDescription: z.string().optional(),
  similarWorkflow: z.string().min(1, {
    message: "Please select a similar workflow.",
  }),
});

export default function AddWorkflowPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedTestCases, setGeneratedTestCases] = useState(null);

  // Example existing workflows for similarity selection
  const existingWorkflows = [
    { id: "nas", name: "NAS Backup & Recovery" },
    { id: "oracle", name: "Oracle Database" },
    { id: "sap", name: "SAP HANA" },
    { id: "sql", name: "SQL Server" },
    { id: "filesystem", name: "File System" },
  ];

  // Form setup
  const form = useForm({
    resolver: zodResolver(workflowFormSchema),
    defaultValues: {
      workflowName: "",
      workflowDescription: "",
      similarWorkflow: "",
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    setIsSubmitting(true);

    // Simulate generating test cases after a delay
    setTimeout(() => {
      const selectedWorkflow = existingWorkflows.find(
        (w) => w.id === data.similarWorkflow,
      );
      const workflowBaseName = selectedWorkflow?.name || "Generic Workflow";
      const workflowName = data.workflowName;

      // Generate mock test cases based on selected similar workflow
      const testCases = [
        {
          id: "TC-001",
          name: `${workflowName} - Basic Configuration Test`,
          description: `Validate basic configuration settings for ${workflowName}`,
          priority: "High",
          steps: [
            "Configure test environment with required parameters",
            "Initiate workflow process",
            "Verify configuration is correctly applied",
            "Validate output matches expected results",
          ],
          expectedResults: [
            "Configuration settings are applied without errors",
            "Process completes successfully",
            "Output matches expected format and values",
          ],
          reusableComponents: ["Environment Setup", "Configuration Validator"],
        },
        {
          id: "TC-002",
          name: `${workflowName} - Error Handling Test`,
          description: `Verify proper error handling in ${workflowName} process`,
          priority: "Medium",
          steps: [
            "Configure test environment with invalid parameters",
            "Initiate workflow process",
            "Observe error handling behavior",
            "Attempt recovery process",
          ],
          expectedResults: [
            "System provides clear error messages",
            "No data corruption occurs",
            "System can recover to stable state",
          ],
          reusableComponents: ["Error Simulator", "Recovery Validator"],
        },
        {
          id: "TC-003",
          name: `${workflowName} - Performance Test`,
          description: `Evaluate performance metrics for ${workflowName}`,
          priority: "Medium",
          steps: [
            "Set up performance monitoring tools",
            "Execute workflow with standard dataset",
            "Measure response times and resource usage",
            "Compare results against baseline",
          ],
          expectedResults: [
            "Response time within acceptable thresholds",
            "Resource usage stays within defined limits",
            "No memory leaks or runaway processes detected",
          ],
          reusableComponents: ["Performance Monitor", "Metrics Analyzer"],
        },
      ];

      setGeneratedTestCases(testCases);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-5xl py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="size-5 text-blue-600" />
            New Workflow
          </CardTitle>
          <CardDescription>
            Create a new workflow and generate test cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="workflowName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workflow Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workflow name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a descriptive name for this workflow
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workflowDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter workflow description"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the purpose and scope of this workflow
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="similarWorkflow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Similar Workflow</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select similar workflow" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {existingWorkflows.map((workflow) => (
                          <SelectItem key={workflow.id} value={workflow.id}>
                            {workflow.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Test cases will be based on patterns from the selected
                      workflow
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="size-4 animate-spin" />
                      Generating Test Cases...
                    </>
                  ) : (
                    <>
                      <Layers className="size-4" />
                      Create Workflow & Generate Test Cases
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Display Generated Test Cases */}
      {generatedTestCases && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="size-5 text-green-600" />
                Generated Test Cases
              </CardTitle>
              <CardDescription>
                {generatedTestCases.length} test cases have been generated based
                on your workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {generatedTestCases.map((testCase) => (
                  <div key={testCase.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                          {testCase.id}
                        </span>
                        <h3 className="font-semibold">{testCase.name}</h3>
                      </div>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium">
                        Priority: {testCase.priority}
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-gray-600">
                      {testCase.description}
                    </p>

                    <div className="mt-3">
                      <h4 className="mb-1 text-sm font-medium">Steps:</h4>
                      <ol className="ml-5 list-decimal text-sm">
                        {testCase.steps.map((step, index) => (
                          <li key={index} className="mb-1">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-3">
                      <h4 className="mb-1 text-sm font-medium">
                        Expected Results:
                      </h4>
                      <ul className="ml-5 list-disc text-sm">
                        {testCase.expectedResults.map((result, index) => (
                          <li key={index} className="mb-1">
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {testCase.reusableComponents.map((component, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs"
                        >
                          {component}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="gap-2">
                <Plus className="size-4" />
                Add Custom Test Case
              </Button>
              <Button className="ml-2 gap-2">
                <CheckCircle2 className="size-4" />
                Save All Test Cases
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
