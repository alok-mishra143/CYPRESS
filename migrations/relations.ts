import { relations } from "drizzle-orm/relations";
import { folders, files, workspaces, usersInAuth, users, collaborators } from "./schema";

export const filesRelations = relations(files, ({one}) => ({
	folder: one(folders, {
		fields: [files.folder_id],
		references: [folders.id]
	}),
	workspace: one(workspaces, {
		fields: [files.workspace_id],
		references: [workspaces.id]
	}),
}));

export const foldersRelations = relations(folders, ({one, many}) => ({
	files: many(files),
	workspace: one(workspaces, {
		fields: [folders.workspace_id],
		references: [workspaces.id]
	}),
}));

export const workspacesRelations = relations(workspaces, ({many}) => ({
	files: many(files),
	folders: many(folders),
	collaborators: many(collaborators),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [users.id],
		references: [usersInAuth.id]
	}),
	collaborators: many(collaborators),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	users: many(users),
}));

export const collaboratorsRelations = relations(collaborators, ({one}) => ({
	user: one(users, {
		fields: [collaborators.user_id],
		references: [users.id]
	}),
	workspace: one(workspaces, {
		fields: [collaborators.workspace_id],
		references: [workspaces.id]
	}),
}));