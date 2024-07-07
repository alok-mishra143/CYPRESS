"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import Loadingsvg from "../../../public/loading";
import { ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/components/ui/use-toast";

interface MessageProps {
  type: string;
  text: string;
  avatarFallback: string;
}

export function ChatWithAI() {
  const [Loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [promptValue, setPromptValue] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const copyTextToClipboard = (text: string) => {
    console.log("Copying text to clipboard: ", text);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
        toast({
          title: "Text copied to clipboard",
          description: "the AI response has been copied to your clipboard.",
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptValue(e.target.value);
  };

  const handleClick = () => {
    if (promptValue.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "user",
        text: promptValue,
        avatarFallback: "YO",
      },
    ]);

    generateAiAnswer(promptValue);
    setLoading(true);
    setPromptValue("");
  };

  const generateAiAnswer = async (prompt: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/Bard`, {
        method: "POST",
        body: JSON.stringify({ question: prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const aiAnswer = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          text: aiAnswer.text,
          avatarFallback: "OA",
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-[95%] w-full max-w-5xl mx-auto bg-gray-900 text-black rounded-2xl shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            } items-start gap-3`}
          >
            {message.type === "bot" && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{message.avatarFallback}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`${
                message.type === "user"
                  ? "bg-[#030014] text-[#CAC2FF]"
                  : "bg-[#030014] text-[#CAC2FF]"
              } rounded-2xl p-3 max-w-[90%] sm:max-w-[80%] min-w-[40%]`}
            >
              <div className="font-medium text-sm">
                {message.type === "user" ? "You" : "ChatBot"}
              </div>
              <div className="text-sm">{message.text}</div>
              <div className="flex items-center justify-between mt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyTextToClipboard(message.text)}
                  className={`w-4 h-4 hover:bg-transparent text-gray-400 hover:text-gray-100 `}
                >
                  <ClipboardIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {message.type === "user" && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{message.avatarFallback}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className=" rounded-b-2xl p-4 flex items-center gap-2 ">
        <Input
          placeholder="Type your message..."
          className="flex-1 rounded-2xl resize-none p-3 bg-gray-900 text-white focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onChange={handleChange}
          value={promptValue}
        />
        <Button
          type="submit"
          size="icon"
          className="w-8 h-8 bg-blue-600 hover:bg-blue-700"
          onClick={handleClick}
          disabled={Loading}
        >
          {!Loading ? (
            <ArrowUpIcon className="w-4 h-4 text-white" />
          ) : (
            <Loadingsvg />
          )}
        </Button>
      </div>
    </div>
  );
}

function ArrowUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function ClipboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}
