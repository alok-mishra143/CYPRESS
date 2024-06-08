"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { useSupabaseUser } from "@/lib/provider/supabase-userProvider";
import { useAppState } from "@/lib/provider/state-provider";
import { createClient } from "@/lib/supabase/client";

interface LogoutButtonProps {
  children: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
  const { user } = useSupabaseUser();
  const { dispatch } = useAppState();
  const router = useRouter();
  const supabase = createClient();
  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    dispatch({ type: "SET_WORKSPACES", payload: { workspaces: [] } });
  };
  return (
    <Button variant="ghost" size="icon" className="p-0" onClick={logout}>
      {children}
    </Button>
  );
};

export default LogoutButton;
