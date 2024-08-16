"use client";
import { MAX_FOLDERS_FREE_PLAN } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

import { useAppState } from "@/lib/provider/state-provider";
import CypressDiamondIcon from "../icons/cypressDiamongIcon";

interface PlanUsageProps {
  foldersLength: number;
  subscription: null;
}

const PlanUsage: React.FC<PlanUsageProps> = ({
  foldersLength,
  subscription,
}) => {
  const { workspaceId, state } = useAppState();
  const [usagePercentage, setUsagePercentage] = useState(
    (foldersLength / MAX_FOLDERS_FREE_PLAN) * 100
  );

  useEffect(() => {
    const stateFoldersLength = state.workspaces.find(
      (workspace) => workspace.id === workspaceId
    )?.folders.length;
    if (stateFoldersLength === undefined) return;
    setUsagePercentage((stateFoldersLength / MAX_FOLDERS_FREE_PLAN) * 100);
  }, [state, workspaceId]);

  return (
    <article className="mb-4">
      {subscription !== "active" && (
        <div
          className="flex 
          gap-2
          text-muted-foreground
          mb-2
          items-center
        "
        >
          <div className="h-4 w-4"></div>
          <div
            className="flex 
        justify-between 
        w-full 
        items-center
        "
          >
            <div>Max 10 folder</div>
            <small>{usagePercentage.toFixed(0)}% / 100%</small>
          </div>
        </div>
      )}
      {subscription !== "active" && (
        <Progress value={usagePercentage} className="h-1" />
      )}
    </article>
  );
};

export default PlanUsage;
