CREATE TABLE IF NOT EXISTS "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(5) NOT NULL,
	CONSTRAINT "countries_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "letters" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"submitted_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"author_age" integer NOT NULL,
	"content" text NOT NULL,
	"media_consent" boolean DEFAULT false NOT NULL,
	"country_id" integer NOT NULL,
	CONSTRAINT "letters_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "letters_to_tags" (
	"letter_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT letters_to_tags_letter_id_tag_id PRIMARY KEY("letter_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "letters" ADD CONSTRAINT "letters_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "letters_to_tags" ADD CONSTRAINT "letters_to_tags_letter_id_letters_id_fk" FOREIGN KEY ("letter_id") REFERENCES "letters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "letters_to_tags" ADD CONSTRAINT "letters_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
