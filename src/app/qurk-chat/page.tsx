"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import {
  Send,
  BrainCircuit,
  AlertCircle,
  Bug,
  RefreshCw,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function QurkChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm Qurk, your release intelligence assistant. I can help you with information about your current release, fetch data from Jira and Confluence, analyze escalations, and provide recommendations. How can I assist you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
        timestamp: new Date().toISOString(),
      },
    ]);

    setIsProcessing(true);

    setTimeout(() => {
      let response;

      if (input.toLowerCase().includes("miles 19.19")) {
        response =
          "Miles 19.19 is currently in DEVELOPMENT phase with a health score of 76%. The scheduled release date is April 15, 2025 (48 days remaining). There are 4 high-priority escalations from the previous release that we're addressing. Would you like more specific information about test coverage or problematic areas?";
      } else if (
        input.toLowerCase().includes("escalation") ||
        input.toLowerCase().includes("issue")
      ) {
        response =
          "The top escalation areas based on Miles 19.18 are:\n\n1. Backup Process (7 issues, High severity)\n2. Data Replication (5 issues, Medium severity)\n3. User Access (4 issues, Medium severity)\n\nWould you like me to generate recommended test cases for any of these areas?";
      } else if (
        input.toLowerCase().includes("jira") ||
        input.toLowerCase().includes("ticket")
      ) {
        response =
          "Currently, there are 248 active Jira tickets for Miles 19.19:\n- 32 Critical\n- 86 High\n- 112 Medium\n- 18 Low\n\nThe team has resolved 176 tickets so far. The highest concentration of tickets is in the Backup Process module. Would you like me to prioritize these based on past escalation patterns?";
      } else if (
        input.toLowerCase().includes("workflow") ||
        input.toLowerCase().includes("create")
      ) {
        response =
          "I can help create a new workflow for testing. Based on escalation patterns from Miles 19.18, I recommend focusing on the Backup Authentication flow, which had 4 severe escalations. Would you like me to generate a comprehensive test workflow for this area with specific test cases?";
      } else {
        response =
          "I've analyzed the current release status and noticed that the Backup Process area has the lowest health score at 65%. This corresponds with historical escalation patterns. Would you like me to recommend specific improvements for this area or generate additional test cases to improve coverage?";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
          timestamp: new Date().toISOString(),
        },
      ]);

      setIsProcessing(false);
      setInput("");
    }, 1500);
  };

  const isEmptyChat = messages.length <= 1;

  return (
    <div className="-my-6 flex h-full flex-col overflow-hidden py-3">
      {/* Header - fixed at top */}
      <div className="flex-none border-b bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100">
            <BrainCircuit className="size-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Chat with Qurk</h1>
            <p className="text-xs text-muted-foreground">
              Your intelligent release assistant
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area - takes all available space */}
      <div className="flex flex-1 flex-col overflow-hidden bg-slate-50">
        {/* Messages area - takes 85% of the remaining height */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4"
          style={{ height: "85%" }}
        >
          {isEmptyChat ? (
            <div className="flex h-full flex-col items-center justify-center px-4 text-center">
              <BrainCircuit className="mb-4 size-16 text-blue-200" />
              <h3 className="mb-2 text-xl font-medium">Welcome to Qurk</h3>
              <p className="mb-6 max-w-md text-muted-foreground">
                Ask me about your release status, escalations, or workflows. I
                can help analyze data and provide recommendations.
              </p>
              <div className="grid w-full max-w-md grid-cols-2 gap-3">
                <div className="flex flex-col items-center rounded-lg border bg-white p-3 shadow-sm">
                  <Bug className="mb-1 size-5 text-blue-500" />
                  <p className="text-sm font-medium">Jira Analysis</p>
                </div>
                <div className="flex flex-col items-center rounded-lg border bg-white p-3 shadow-sm">
                  <AlertCircle className="mb-1 size-5 text-blue-500" />
                  <p className="text-sm font-medium">Escalation Tracking</p>
                </div>
                <div className="flex flex-col items-center rounded-lg border bg-white p-3 shadow-sm">
                  <RefreshCw className="mb-1 size-5 text-blue-500" />
                  <p className="text-sm font-medium">Workflow Creation</p>
                </div>
                <div className="flex flex-col items-center rounded-lg border bg-white p-3 shadow-sm">
                  <FileText className="mb-1 size-5 text-blue-500" />
                  <p className="text-sm font-medium">Documentation Help</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[80%] items-start gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar
                      className={cn(
                        "flex items-center justify-center",
                        message.role === "assistant"
                          ? "size-8 bg-blue-100"
                          : "size-8 bg-slate-200",
                      )}
                    >
                      {message.role === "assistant" ? (
                        <BrainCircuit className="size-4 text-blue-600" />
                      ) : (
                        <AvatarFallback className="text-xs">YOU</AvatarFallback>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-white"
                          : "border bg-white shadow-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                      <div
                        className={`mt-1 text-xs ${
                          message.role === "user"
                            ? "text-blue-100"
                            : "text-slate-400"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <Avatar className="flex size-8 items-center justify-center bg-blue-100">
                      <BrainCircuit className="size-4 text-blue-600" />
                    </Avatar>
                    <div className="rounded-lg border bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="size-2 animate-pulse rounded-full bg-blue-500"></div>
                        <div className="size-2 animate-pulse rounded-full bg-blue-500 delay-150"></div>
                        <div className="size-2 animate-pulse rounded-full bg-blue-500 delay-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input area - takes remaining height (15%) and always stays at bottom */}
        <div
          className="flex-none border-t bg-white pt-6 shadow-md"
          style={{ height: "15%" }}
        >
          <div className="m-auto max-w-3xl">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Qurk about your release, escalations, or workflows..."
                className="max-h-20 min-h-10 flex-1 resize-none rounded-full px-4 py-2 shadow-sm"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                  }
                }}
              />
              <Button
                type="submit"
                className={`rounded-full ${!input.trim() ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!input.trim() || isProcessing}
              >
                <Send className="size-4" />
              </Button>
            </form>

            <div className="mt-1 text-center text-xs text-muted-foreground">
              Qurk can access data from Jira, Confluence, and testing systems
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
