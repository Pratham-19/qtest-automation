"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Search,
  GitMerge,
  AlertTriangle,
  BrainCircuit,
  ArrowUpRightSquare,
  Plus,
  Code2,
  Bug,
  Sparkles,
  ChevronRight,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (expanded) {
      const timer = setTimeout(() => setShowText(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [expanded]);

  const handleMouseEnter = () => setExpanded(true);
  const handleMouseLeave = () => {
    setShowText(false);
    setTimeout(() => setExpanded(false), 220);
    setActiveGroup(null);
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Search,
      label: "Test Analysis",
      subItems: [
        {
          icon: GitMerge,
          label: "Similar Tests",
          href: "/analysis/similar",
        },
        {
          icon: Code2,
          label: "Redundancy Check",
          href: "/analysis/redundant",
        },
      ],
    },
    {
      icon: BrainCircuit,
      label: "AI Enhancement",
      subItems: [
        {
          icon: Sparkles,
          label: "Auto Complete",
          href: "/enhancement/auto-complete",
        },
        {
          icon: AlertTriangle,
          label: "Risk Analysis",
          href: "/enhancement/risk",
        },
      ],
    },
    {
      icon: Bug,
      label: "Test Management",
      subItems: [
        {
          icon: ArrowUpRightSquare,
          label: "Escalations",
          href: "/management/escalation",
        },
        {
          icon: Bug,
          label: "Bug Relevancy",
          href: "/management/bugs",
        },
      ],
    },
  ];

  return (
    <motion.div
      className="fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-primary backdrop-blur-xl"
      animate={{ width: expanded ? 280 : 70 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: expanded ? 0 : 0.3,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-white/10 px-4">
        <motion.div
          className="flex items-center"
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
        >
          <motion.div
            className="flex items-center justify-center rounded-lg bg-gradient-to-tr from-blue-400/40 via-blue-300/30 to-white/20 p-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FlaskConical className="size-7 text-white" />
          </motion.div>
          <AnimatePresence mode="wait">
            {showText && (
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
              >
                <span className="ml-3 text-lg font-semibold text-white">
                  TestLabs
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item, index) => (
          <div key={item.label} className="relative">
            <div
              onClick={() =>
                setActiveGroup(activeGroup === index ? null : index)
              }
              className={`group relative flex h-10 cursor-pointer items-center rounded-lg px-3
                ${activeGroup === index ? "bg-white/10" : "hover:bg-white/10"}
                transition-colors duration-200`}
            >
              <motion.div
                className="flex h-5 w-5 items-center justify-center"
                animate={{ x: expanded ? 0 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
              >
                <item.icon className="size-5 text-white" />
              </motion.div>
              <AnimatePresence mode="wait">
                {showText && (
                  <motion.div
                    className="flex flex-1 items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      delay: index * 0.05,
                    }}
                  >
                    <span className="ml-3 text-white">{item.label}</span>
                    {item.subItems && (
                      <ChevronRight
                        className={`size-4 text-white transition-transform duration-200
                          ${activeGroup === index ? "rotate-90" : ""}`}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subitems */}
            <AnimatePresence>
              {item.subItems && activeGroup === index && showText && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="group mt-1 flex h-10 items-center rounded-lg py-2 pl-12 pr-3 text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    >
                      <subItem.icon className="mr-3 size-4" />
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <Button
          variant="outline"
          className="relative flex h-10 w-full items-center justify-start overflow-hidden"
        >
          <Plus className="absolute left-2 size-5" />
          <AnimatePresence mode="wait">
            {showText && (
              <motion.span
                className="ml-10 whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
              >
                Create new test
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.div>
  );
}
