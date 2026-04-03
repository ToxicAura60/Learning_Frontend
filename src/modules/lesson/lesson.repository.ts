import { prisma } from "../../client";

const createLesson = async ({
  title,
  content,
}: {
  title: string;
  content: any;
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