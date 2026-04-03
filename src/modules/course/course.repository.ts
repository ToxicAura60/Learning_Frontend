import { prisma } from "../../client";

const createCourse = async ({
  title,
  description,
}: {
  title: string;
  description: any;
}) => {
  try {
    return await prisma.lesson.create({
      data: {
        title,
        content
      }
    });
  } catch (error) {
    throw error;
  }
}

export default {
  createLesson
}