import { prisma } from "../../client";

const createCourse = async ({
  title,
  description,
  authorId,
  slug
}: {
  title: string;
  description?: string;
  authorId: string
  slug: string;
}) => {
  try {
    return await prisma.course.create({
      data: {
        title,
        description,
        authorId,
        slug
      }
    });
  } catch (error) {
    throw error;
  }
}

const listCourse = async () => {
  try {
    return await prisma.course.findMany();
  } catch (error) {
    throw error;
  }
};

const findCourseBySlug = async (slug: string) => {
  try {
    return await prisma.course.findUnique({
      where: {
        slug
      },
    });
  } catch (error) {
    throw error;
  }
}

const updateCourse = async ({
  id,
  title,
  description,
  slug
}: {
  id: string;
  title?: string;
  description?: string;
  slug?: string;
}) => {
  try {
    return await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        slug,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deleteCourse = async (id: string) => {
  try {
    return await prisma.course.delete({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  createCourse,
  findCourseBySlug,
  listCourse,
  updateCourse,
  deleteCourse,
}