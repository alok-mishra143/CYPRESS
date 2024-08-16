"use client";

import React, { use, useEffect } from "react";

import { File } from "../supabase/supabase.types";
import { useRouter } from "next/navigation";
import { useAppState } from "../provider/state-provider";
import Realtime_supabase from "@/components/RealTime/RealTime";
const useSupabaseRealtime = () => {
  const { dispatch, state, workspaceId: selectedWorskpace } = useAppState();
  const router = useRouter();
  const supabase = Realtime_supabase;

  useEffect(() => {
    console.log("testing the supabase connection");
    supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload) => console.log(payload)
      )
      .subscribe();
  }, [supabase]);

  useEffect(() => {
    // console.log("🟢 Getting events ");

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "files" },
        async (payload: any) => {
          console.log("🟢 PAYLOAD", payload);
          if (payload.eventType === "INSERT") {
            console.log("🟢 RECEIVED REAL TIME EVENT");
            const {
              folder_id: folderId,
              workspace_id: workspaceId,
              id: fileId,
            } = payload.new;
            if (
              !state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((folder) => folder.id === folderId)
                ?.files.find((file) => file.id === fileId)
            ) {
              const newFile: File = {
                id: payload.new.id,
                workspace_id: payload.new.workspace_id,
                folder_id: payload.new.folder_id,
                created_at: payload.new.created_at,
                title: payload.new.title,
                icon_id: payload.new.icon_id,
                data: payload.new.data,
                in_trash: payload.new.in_trash,
                banner_url: payload.new.banner_url,
              };
              dispatch({
                type: "ADD_FILE",
                payload: { file: newFile, folderId, workspaceId },
              });
            }
          } else if (payload.eventType === "DELETE") {
            let workspaceId = "";
            let folderId = "";
            const fileExists = state.workspaces.some((workspace) =>
              workspace.folders.some((folder) =>
                folder.files.some((file) => {
                  if (file.id === payload.old.id) {
                    workspaceId = workspace.id;
                    folderId = folder.id;
                    return true;
                  }
                })
              )
            );
            if (fileExists && workspaceId && folderId) {
              router.replace(`/dashboard/${workspaceId}`);
              dispatch({
                type: "DELETE_FILE",
                payload: { fileId: payload.old.id, folderId, workspaceId },
              });
            }
          } else if (payload.eventType === "UPDATE") {
            const { folder_id: folderId, workspace_id: workspaceId } =
              payload.new;
            state.workspaces.some((workspace) =>
              workspace.folders.some((folder) =>
                folder.files.some((file) => {
                  if (file.id === payload.new.id) {
                    dispatch({
                      type: "UPDATE_FILE",
                      payload: {
                        workspaceId,
                        folderId,
                        fileId: payload.new.id,
                        file: {
                          title: payload.new.title,
                          icon_id: payload.new.icon_id,
                          in_trash: payload.new.in_trash,
                        },
                      },
                    });
                    return true;
                  }
                })
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, state, selectedWorskpace, dispatch, router]);

  return null;
};

export default useSupabaseRealtime;
