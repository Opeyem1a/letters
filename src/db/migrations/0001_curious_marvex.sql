ALTER TABLE "letters" ADD COLUMN "approved" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "letters" ADD COLUMN "published" boolean DEFAULT false NOT NULL;