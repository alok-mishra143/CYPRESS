import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GenerateTemplate = ({ quill }: any) => {
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Manage dialog open state

  const generateAiAnswer = async (prompt: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/Bard`,
        {
          method: "POST",
          body: JSON.stringify({ question: prompt }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate template");
      }

      const aiAnswer = await response.json();
      quill.insertText(quill.getLength(), aiAnswer.text);
      setLoading(false);
      setIdea(""); // Clear the input field
      setIsOpen(false); // Close the dialog box
    } catch (error) {
      console.error("Error generating template:", error);
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    generateAiAnswer(idea);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="fixed md:bottom-4 right-4  bottom-20 ">
          <Button variant="outline">Generate content</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Content</DialogTitle>
          <DialogDescription>
            Enter your idea, and we’ll create a content based on it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="idea" className="text-right">
              Idea
            </Label>
            <Input
              id="idea"
              placeholder="Enter your idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateTemplate;
