import courseRepository from '../course/course.repository';
import sectionRepository from '../section/section.repository';
import lessonRepository from './lesson.repository';

const createLesson = async ({
  courseSlug,
  sectionSlug,
  title,
  content,
  order,
  slug
}: {
  courseSlug: string;
  sectionSlug: string;
  title: string;
  content: any;
  order: number;
  slug: string;
}) => {
  try {
    const course = await courseRepository.findCourseBySlug(courseSlug)

    if(!course) {
      throw ""
    }

    const section = await sectionRepository.findSectionByCourseIdAndSlug({
      courseId: course.id,
      slug: sectionSlug
    })

    if(!section) {
      throw ""
    }

    return await lessonRepository.createLesson({
      sectionId: section.id,
      title,
      content,
      order,
      slug
    });
  } catch (error) {
    throw error;
  }
};

const listLesson = async ({
  courseSlug,
  sectionSlug,
}: {
  courseSlug: string;
  sectionSlug: string;
}) => {
  try {
    const course = await courseRepository.findCourseBySlug(courseSlug)

    if(!course) {
      throw ""
    }

    const section = await sectionRepository.findSectionByCourseIdAndSlug({
      courseId: course.id,
      slug: sectionSlug
    })

    if(!section) {
      throw ""
    }

    return await lessonRepository.listLesson(section.id)
  } catch (error) {
    throw error
  }
}

const updateLesson = async ({
  courseSlug,
  sectionSlug,
  oldSlug,
  title,
  content,
  order,
  newSlug
}: {
  courseSlug: string;
  sectionSlug: string;
  oldSlug: string;
  title?: string;
  content?: string;
  order?: number;
  newSlug?: string;
}) => {
  try {
    const course = await courseRepository.findCourseBySlug(courseSlug)

    if(!course) {
      throw ""
    }

    const section = await sectionRepository.findSectionByCourseIdAndSlug({
      courseId: course.id,
      slug: sectionSlug
    })

     if(!section) {
      throw ""
    }

    const lesson = await lessonRepository.findLessonBySectionIdAndSlug({
      sectionId: section.id,
      slug: oldSlug
    })

    if(!lesson) {
      throw ""
    }

    return await lessonRepository.updateLesson({
      id: lesson.id,
      title,
      content,
      order,
      slug: newSlug
    });

  } catch (error) {
    throw error;
  }
}

const deleteLesson = async ({
  courseSlug,
  sectionSlug,
  lessonSlug
}: {
  courseSlug: string;
  sectionSlug: string;
  lessonSlug: string;
}) => {
  try {
    const course = await courseRepository.findCourseBySlug(courseSlug)

    if(!course) {
      throw ""
    }

    const section = await sectionRepository.findSectionByCourseIdAndSlug({
      courseId: course.id,
      slug: sectionSlug
    })

     if(!section) {
      throw ""
    }

    const lesson = await lessonRepository.findLessonBySectionIdAndSlug({
      sectionId: section.id,
      slug: lessonSlug
    })

    if(!lesson) {
      throw ""
    }

    await lessonRepository.deleteLesson(lesson.id)
  } catch (error) {
    throw error;
  }

}
export default {
  createLesson,
  listLesson,
  updateLesson,
  deleteLesson,
}