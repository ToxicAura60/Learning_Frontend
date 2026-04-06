/*
  Warnings:

  - A unique constraint covering the columns `[sectionId,title]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Lesson_sectionId_title_key" ON "Lesson"("sectionId", "title");
