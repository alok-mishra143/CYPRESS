import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ScrollArea } from "../ui/scroll-area";
import WorkspaceDropdown from "./Workspace-Dropdown";
import PlanUsage from "./plan-usage";
import NativeNavigation from "./native-navigation";
import FoldersDropdownList from "./folders-dropdown-list";
import UserCard from "./user-card";
// import FoldersDropdownList from "./folders-dropdown-list";

interface SidebarProps {
  params: { workspaceId: string };
  className?: string;
}

const Sidebar = async ({ params, className }: SidebarProps) => {
  const supabase = createClient();

  //getting the user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  //folders
  const { data: workspaceFolderData, error: foldersError } = await getFolders(
    params.workspaceId
  );
  //error
  if (foldersError) redirect("/dashboard");

  // get workspace
  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  return (
    <aside
      className={twMerge(
        "hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between  overflow-scroll",
        className
      )}
    >
      <div>
        <WorkspaceDropdown
          privateWorkspaces={privateWorkspaces}
          sharedWorkspaces={sharedWorkspaces}
          collaboratingWorkspaces={collaboratingWorkspaces}
          defaultValue={[
            ...privateWorkspaces,
            ...collaboratingWorkspaces,
            ...sharedWorkspaces,
          ].find((workspace) => workspace.id === params.workspaceId)}
        />

        <NativeNavigation myWorkspaceId={params.workspaceId} />
        <ScrollArea
          className="overflow-scroll relative
      h-[550px] 
    "
        >
          <div
            className="pointer-events-none 
      w-full 
      absolute 
      bottom-0 
      h-20 
      bg-gradient-to-t 
      from-background 
      to-transparent 
      z-40"
          />
          <FoldersDropdownList
            workspaceFolders={workspaceFolderData || []}
            workspaceId={params.workspaceId}
          />
        </ScrollArea>
      </div>
      <UserCard />
    </aside>
  );
};

export default Sidebar;
