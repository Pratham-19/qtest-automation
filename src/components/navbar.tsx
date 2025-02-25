import { BellRing, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Navbar() {
  return (
    <nav className="z-50 flex h-16 w-full flex-none items-center justify-between bg-primary px-4 shadow-md">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-lg bg-white/20 p-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="M12 3V6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M14 5L12 7L10 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M8 12L10 14L14 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M16 14V18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 16V18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M8 17V18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <circle cx="12" cy="12" r="1" fill="white" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-white">
            PowerPredict AI
          </span>
          <span className="text-xs text-white/80">
            Release Intelligence Platform
          </span>
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center lg:flex">
        <Badge className="border-none bg-white/20 px-3 py-1 text-white hover:bg-white/30">
          ISG HACKATHON 2025
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-white/20"
          >
            <BellRing className="size-5" />
            <span className="absolute right-2 top-2 size-2 animate-pulse rounded-full bg-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <User className="size-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
