"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CodeEditor({
  value,
  onChange,
  placeholder = "",
  className,
}: CodeEditorProps) {
  const [lineCount, setLineCount] = useState<number>(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update line count when value changes
  useEffect(() => {
    const lines = (value || "").split("\n").length;
    setLineCount(Math.max(1, lines));
  }, [value]);

  // Handle tab key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      // Insert tab at cursor position
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);

      // Move cursor after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div
      className={cn(
        "relative font-mono text-sm border rounded-md overflow-hidden bg-gray-900 text-gray-100 dark:bg-gray-950",
        className
      )}
    >
      {/* Editor header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
        <div className="text-xs font-medium text-gray-300">
          Problem Statement
        </div>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      <div className="flex">
        {/* Line numbers */}
        <div className="py-3 px-2 text-right select-none bg-gray-800 dark:bg-gray-900 text-gray-500 border-r border-gray-700 min-w-[40px]">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none p-3 resize-none min-h-[200px] leading-6 placeholder:text-gray-500"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
