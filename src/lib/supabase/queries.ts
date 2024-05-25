"use server";

import { validate } from "uuid";
import { workspaces, files, folders, users } from "../../../migrations/schema";
import db from "./db";
import { Folder, Subscription, User, workspace } from "./supabase.types";
import { and, eq, ilike, notExists } from "drizzle-orm";
import { collaborators } from "./schema";

export const createWorkspace = async (workspace: workspace) => {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (s, { eq }) => eq(s.userId, userId),
    });
    if (data) return { data: data as Subscription, error: null };
    else return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: `Error` };
  }
};

export const getFolders = async (workspaceId: string) => {
  const isValid = validate(workspaceId);
  if (!isValid)
    return {
      data: null,
      error: "Error",
    };

  try {
    const results: Folder[] | [] = await db
      .select()
      .from(folders)
      .orderBy(folders.created_at)
      .where(eq(folders.workspace_id, workspaceId));
    return { data: results, error: null };
  } catch (error) {
    return { data: null, error: "Error" };
  }
};

export const getPrivateWorkspaces = async (userId: string) => {
  if (!userId) return [];
  const privateWorkspaces = (await db
    .select({
      id: workspaces.id,
      createdAt: workspaces.created_at,
      workspaceOwner: workspaces.workspace_owner,
      title: workspaces.title,
      iconId: workspaces.icon_id,
      data: workspaces.data,
      inTrash: workspaces.in_trash,
      logo: workspaces.logo,
      bannerUrl: workspaces.banner_url,
    })
    .from(workspaces)
    .where(
      and(
        notExists(
          db
            .select()
            .from(collaborators)
            .where(eq(collaborators.workspaceId, workspaces.id))
        ),
        eq(workspaces.workspace_owner, userId)
      )
    )) as unknown as workspace[];
  return privateWorkspaces;
};

export const getCollaboratingWorkspaces = async (userId: string) => {
  if (!userId) return [];
  const collaboratedWorkspaces = (await db
    .select({
      id: workspaces.id,
      createdAt: workspaces.created_at,
      workspaceOwner: workspaces.workspace_owner,
      title: workspaces.title,
      iconId: workspaces.icon_id,
      data: workspaces.data,
      inTrash: workspaces.in_trash,
      logo: workspaces.logo,
      bannerUrl: workspaces.banner_url,
    })
    .from(users)
    .innerJoin(collaborators, eq(users.id, collaborators.userId))
    .innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id))
    .where(eq(users.id, userId))) as unknown as workspace[];
  return collaboratedWorkspaces;
};

export const getSharedWorkspaces = async (userId: string) => {
  if (!userId) return [];
  const sharedWorkspaces = (await db
    .selectDistinct({
      id: workspaces.id,
      createdAt: workspaces.created_at,
      workspaceOwner: workspaces.workspace_owner,
      title: workspaces.title,
      iconId: workspaces.icon_id,
      data: workspaces.data,
      inTrash: workspaces.in_trash,
      logo: workspaces.logo,
      bannerUrl: workspaces.banner_url,
    })
    .from(workspaces)
    .orderBy(workspaces.created_at)
    .innerJoin(collaborators, eq(workspaces.id, collaborators.workspaceId))
    .where(eq(workspaces.workspace_owner, userId))) as unknown as workspace[];
  return sharedWorkspaces;
};

// export const addCollaborators = async (users: User[], workspaceId: string) => {
//   const response = users.forEach(async (user: User) => {
//     const userExists = await db.query.collaborators.findFirst({
//       where: (u, { eq }) =>
//         and(eq(u.userId, user.id), eq(u.workspaceId, workspaceId)),
//     });
//     if (!userExists)
//       await db.insert(collaborators).values({ workspaceId, userId: user.id });
//   });
// };
