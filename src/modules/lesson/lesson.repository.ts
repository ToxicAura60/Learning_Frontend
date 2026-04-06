import { prisma } from "../../client";

const createLesson = async ({
  title,
  content,
  order,
  slug,
  sectionId
}: {
  title: string;
  content: any;
  order: number;
  slug: string;
  sectionId: string
}) => {
  try {
    return await prisma.lesson.create({
      data: {
        title,
        content,
        order,
        slug,
        sectionId
      }
    });
  } catch (error) {
    throw error;
  }
}

const findLessonBySectionIdAndSlug = async ({
  sectionId,
  slug
}: {
  sectionId: string;
  slug: string;
}) => {
  try {
    return await prisma.lesson.findUnique({
      where: {
        sectionId_slug: { sectionId, slug }
      }
    });
  } catch (error) {
    throw error;
  }
}

const listLesson = async (sectionId: string) => {
  try {
    return await prisma.lesson.findMany({
      where: { sectionId }
    });
  } catch (error) {
    throw error;
  }
}

const updateLesson = async ({
  id,
  title,
  content,
  order,
  slug
}: {
  id: string;
  title?: string;
  content?: string;
  order?: number;
  slug?: string;
}) => {
  try {
    return await prisma.lesson.update({
      where: { id },
      data: {
        title,
        content,
        order,
        slug
      }
    })
  } catch (error) {
    throw error
  }
}

const deleteLesson = async (id: string) => {
  try {
    return await prisma.lesson.delete({
      where: { id },
    })
  } catch (error) {
    throw error
  }
}

export default {
  createLesson,
  listLesson,
  findLessonBySectionIdAndSlug,
  updateLesson,
  deleteLesson
}