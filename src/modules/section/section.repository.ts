import { prisma } from "../../client";

const createSection = async ({
  courseId,
  title,
  order,
  slug
}: {
  courseId: string;
  title: string;
  order: number;
  slug: string;
}) => {
  try {
    return await prisma.section.create({
      data: {
        courseId,
        title,
        order,
        slug
      }
    });
  } catch (error) {
    throw error;
  }
}

const findSectionByCourseIdAndSlug = async ({
  courseId,
  slug
}: {
  courseId: string;
  slug: string;
}) => {
  try {
    return await prisma.section.findUnique({
      where: {
        courseId_slug: { courseId, slug }
      }
    });
  } catch (error) {
    throw error;
  }
}

const listSection = async (courseId: string) => {
  try {
    return await prisma.section.findMany({
      where: {
        courseId
      }
    });
  } catch (error) {
    throw error;
  }
}

const updateSection = async ({
  id,
  title,
  order,
  slug
}: {
  id: string;
  title?: string;
  order?: number;
  slug?: string;
}) => {
  try {
    return await prisma.section.update({
      where: {
        id
      }, 
      data: {
        title,
        order,
        slug
      }
    })
  } catch (error) {
    throw error
  }
}

const deleteSection = async (id: string) => {
  try {
    return await prisma.section.delete({
      where: {
        id
      }
    })
  } catch (error) {
    throw error
  }
}


export default {
  createSection,
  findSectionByCourseIdAndSlug,
  listSection,
  updateSection,
  deleteSection
}