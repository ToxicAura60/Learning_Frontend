import courseRepository from "../course/course.repository";
import sectionRepository from "./section.repository";

const createSection = async ({
  courseSlug,
  title,
  order,
  slug
}: {
  courseSlug: string;
  title: string;
  order: number;
  slug: string;
}) => {
  try {
    const course = await courseRepository.findCourseBySlug(courseSlug)

    if(!course) {
      throw ""
    }

    return await sectionRepository.createSection({
      courseId: course.id,
      title,
      order,
      slug
    })

  } catch (error) {
    throw error
  }
}

const listSection = async (courseSlug: string) => {
  try {
    const course = await courseRepository.findCourseBySlug(courseSlug)

    if(!course) {
      throw ""
    }

    return await sectionRepository.listSection(course.id)
  } catch (error) {
    throw error
  }
}

const updateSection = async ({
  courseSlug,
  oldSlug,
  title,
  order,
  newSlug
}: {
  courseSlug: string;
  oldSlug: string;
  title?: string;
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
      slug: oldSlug
    })

    if(!section) {
      throw ""
    }

    return await sectionRepository.updateSection({
      id: section.id,
      title,
      order,
      slug: newSlug
    })
  } catch (error) {
    throw error;
  }
}

const deleteSection = async ({
  courseSlug,
  slug
}: {
  courseSlug: string,
  slug: string
}) => {
  try {
    const course = await courseRepository.findCourseBySlug(courseSlug)

    if(!course) {
      throw ""
    }

    const section = await sectionRepository.findSectionByCourseIdAndSlug({
      courseId: course.id,
      slug
    })

    if(!section) {
      throw ""
    }

    return await sectionRepository.deleteSection(section.id)
  } catch (error) {
    throw error
  }
}

export default {
  createSection,
  listSection,
  updateSection,
  deleteSection
}