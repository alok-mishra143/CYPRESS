import React from "react";
import CustomDialogTrigger from "../global/custom-dialogTrigger";
import { ChatWithAI } from "./chatForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ChatProps {
  children: React.ReactNode;
}

const Chat: React.FC<ChatProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="h-[80%]
        block
        sm:h-[540px]
     
        w-full
        max-w-[600px]"
      >
        <DialogHeader>
          <DialogTitle>Chat With AI </DialogTitle>
          <DialogDescription>
            It may take a few seconds for the AI to respond.
          </DialogDescription>
        </DialogHeader>
        <ChatWithAI />
      </DialogContent>
    </Dialog>
  );
};

export default Chat;
