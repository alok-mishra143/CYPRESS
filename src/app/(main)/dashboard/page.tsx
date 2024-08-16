import DashboardSetup from "@/components/dashboard-setup/dashboard-setup";
import db from "@/lib/supabase/db";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspace_owner, user.id),
  });

  if (!workspace)
    return (
      <div
        className="bg-background
        h-screen
        w-screen
        flex
        justify-center
        items-center
  "
      >
        <DashboardSetup user={user} />
      </div>
    );

  redirect(`/dashboard/${workspace.id}`);
};

export default Page;
