import lessonRepository from './lesson.repository';

const createLesson = async ({
  title,
  content,
}: {
  title: string;
  content: any;
}) => {
  try {
    return await lessonRepository.createLesson({
      title,
      content
    });
  } catch (error) {
    throw error;
  }
};
 
export default {
  createLesson
}