CREATE TABLE "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"service_type" text NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now()
);
