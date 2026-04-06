/*
  Warnings:

  - A unique constraint covering the columns `[courseId,slug]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Section_courseId_slug_key" ON "Section"("courseId", "slug");
