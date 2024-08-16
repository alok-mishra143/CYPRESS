import { pgTable, pgEnum, uuid, timestamp, text, foreignKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const aal_level = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const code_challenge_method = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factor_status = pgEnum("factor_status", ['unverified', 'verified'])
export const factor_type = pgEnum("factor_type", ['totp', 'webauthn', 'phone'])
export const one_time_token_type = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const key_status = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const key_type = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const pricing_plan_interval = pgEnum("pricing_plan_interval", ['day', 'week', 'month', 'year'])
export const pricing_type = pgEnum("pricing_type", ['one_time', 'recurring'])
export const subscription_status = pgEnum("subscription_status", ['trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equality_op = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


export const workspaces = pgTable("workspaces", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	workspace_owner: uuid("workspace_owner").notNull(),
	title: text("title").notNull(),
	icon_id: text("icon_id").notNull(),
	logo: text("logo"),
});

export const files = pgTable("files", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	title: text("title").notNull(),
	icon_id: text("icon_id").notNull(),
	data: text("data"),
	in_trash: text("in_trash"),
	banner_url: text("banner_url"),
	workspace_id: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" } ),
	folder_id: uuid("folder_id").notNull().references(() => folders.id, { onDelete: "cascade" } ),
});

export const folders = pgTable("folders", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	title: text("title").notNull(),
	icon_id: text("icon_id").notNull(),
	data: text("data"),
	in_trash: text("in_trash"),
	banner_url: text("banner_url"),
	workspace_id: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" } ),
});

export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	full_name: text("full_name"),
	avatar_url: text("avatar_url"),
	email: text("email"),
},
(table) => {
	return {
		users_id_fkey: foreignKey({
			columns: [table.id],
			foreignColumns: [table.id],
			name: "users_id_fkey"
		}),
	}
});

export const collaborators = pgTable("collaborators", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	workspace_id: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" } ),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
});