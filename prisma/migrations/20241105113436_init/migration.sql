-- CreateTable
CREATE TABLE "public"."memo_logs" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "memo_logs_pkey" PRIMARY KEY ("id")
);
