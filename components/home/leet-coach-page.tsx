"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import SavedProblems from "../leet-components/saved-problems";
import ProblemInput from "../leet-components/problem-input";
import ResponseDisplay from "../leet-components/response-display";
import AdditionalResources from "../leet-components/additional-resources";
import { toast } from "sonner";

// Sample saved problems for demo
const initialSavedProblems = [
  {
    id: 1,
    title: "Two Sum",
    description: "Find two numbers that add up to target",
  },
  {
    id: 2,
    title: "Valid Parentheses",
    description: "Check if string has valid parentheses",
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists",
  },
];

export default function Home() {
  const [problem, setProblem] = useState("");
  const [tipResponse, setTipResponse] = useState("");
  const [explanationResponse, setExplanationResponse] = useState("");
  const [isLoadingTips, setIsLoadingTips] = useState(false);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedProblems, setSavedProblems] = useState(initialSavedProblems);
  const [showResources, setShowResources] = useState(false);

  const handleGetTips = async () => {
    if (!problem.trim()) return;

    setIsLoadingTips(true);
    setTipResponse("");
    setShowResources(false);

    // Simulate AI response with a delay
    setTimeout(() => {
      setIsLoadingTips(false);
      setTipResponse(
        `### Tips for approaching this problem:

1. **Understand the problem first**
   - What are the inputs and expected outputs?
   - Are there any constraints or edge cases?

2. **Consider using a hash map**
   - Hash maps provide O(1) lookup time
   - They're useful for finding complements or pairs

3. **Think about efficiency**
   - Can you solve this in a single pass?
   - What's the time and space complexity of your approach?

4. **Start with a brute force solution**
   - Then optimize from there
   - Sometimes two pointers or sorting can help

5. **Test your solution with examples**
   - Try the given examples
   - Create your own test cases, especially edge cases`
      );
    }, 2000);
  };

  const handleExplainProblem = async () => {
    if (!problem.trim()) return;

    setIsLoadingExplanation(true);
    setExplanationResponse("");
    setShowResources(false);

    // Simulate AI response with a delay
    setTimeout(() => {
      setIsLoadingExplanation(false);
      setExplanationResponse(
        `### Problem Explanation:

This appears to be the "Two Sum" problem:

**Problem Statement:**
Given an array of integers 'nums' and an integer 'target', return indices of the two numbers such that they add up to the target.

**Input:**
- An array of integers (nums)
- A target integer (target)

**Output:**
- An array of two indices where the corresponding values sum to the target

**Constraints:**
- Each input has exactly one solution
- You may not use the same element twice
- You can return the answer in any order

**Example:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1]`
      );
    }, 2000);
  };

  const handleSaveForLater = () => {
    if (!problem.trim()) return;

    // Create a new problem entry
    const newProblem = {
      id: savedProblems.length + 1,
      title: `Problem ${savedProblems.length + 1}`,
      description:
        problem.substring(0, 100) + (problem.length > 100 ? "..." : ""),
    };

    // Add to saved problems
    setSavedProblems([...savedProblems, newProblem]);
    setIsSaved(true);

    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      duration: 3000,
    });

    // Reset saved status after 3 seconds for demo purposes
    setTimeout(() => setIsSaved(false), 3000);
  };

  const loadSavedProblem = (problemText: string) => {
    setProblem(problemText);
    // Reset responses
    setTipResponse("");
    setExplanationResponse("");
    setShowResources(false);
  };

  const handleDontUnderstand = () => {
    setShowResources(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-[800px] space-y-6">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold text-start">
                AI LeetCode Coach
              </CardTitle>
              <SavedProblems
                savedProblems={savedProblems}
                onLoadProblem={loadSavedProblem}
              />
            </div>
            <CardDescription className="text-lg">
              Paste your LeetCode problem below to get tips, explanations, and
              guidance - not just solutions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProblemInput
              problem={problem}
              setProblem={setProblem}
              onGetTips={handleGetTips}
              onExplainProblem={handleExplainProblem}
              onSaveForLater={handleSaveForLater}
              isLoadingTips={isLoadingTips}
              isLoadingExplanation={isLoadingExplanation}
              isSaved={isSaved}
            />

            {(tipResponse || explanationResponse) && (
              <ResponseDisplay
                tipResponse={tipResponse}
                explanationResponse={explanationResponse}
                onDontUnderstand={handleDontUnderstand}
              />
            )}

            {showResources && <AdditionalResources />}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
