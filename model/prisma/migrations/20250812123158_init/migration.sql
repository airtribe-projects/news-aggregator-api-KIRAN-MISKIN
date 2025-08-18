/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `news` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN "url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "news_id_key" ON "news"("id");
