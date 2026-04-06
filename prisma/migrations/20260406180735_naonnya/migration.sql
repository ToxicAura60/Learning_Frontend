/*
  Warnings:

  - A unique constraint covering the columns `[sectionId,slug]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lesson_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_sectionId_slug_key" ON "Lesson"("sectionId", "slug");
