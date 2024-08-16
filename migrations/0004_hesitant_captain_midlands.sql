DROP TABLE "subscriptions";--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN IF EXISTS "data";--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN IF EXISTS "in_trash";--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN IF EXISTS "banner_url";