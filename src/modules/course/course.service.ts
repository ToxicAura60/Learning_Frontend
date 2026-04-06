import courseRepository from './course.repository';

const createCourse = async ({
  title,
  description,
  authorId,
  slug
}: {
  title: string;
  description?: string;
  authorId: string;
  slug: string;
}) => {
  try {
    return await courseRepository.createCourse({
      title,
      description,
      authorId,
      slug
    })
  } catch (error) {
    throw error;
  }
};

const listCourse = async () => {
  try {
    return await courseRepository.listCourse()
  } catch (error) {
    throw error;
  }
}

const updateCourse = async ({
  title,
  description,
  slug
}: {
  title: string,
  description: string
  slug: string
}) => {
  try {
    const course = await courseRepository.findCourseBySlug(slug)

    if(!course) {
      throw ""
    }

    return await courseRepository.updateCourse({
      id: course.id,
      title,
      description,
      slug
    })
  } catch (error) {
    throw ""
  }
}

const deleteCourse = async ({
  slug
}: {
  slug: string
}): Promise<void> => {
  try {
    const course = await courseRepository.findCourseBySlug(slug)

    if(!course) {
      throw ""
    }


    await courseRepository.deleteCourse(course.id)
  } catch (error) {
    throw error;
  }
}

export default {
  createCourse,
  listCourse,
  updateCourse,
  deleteCourse
}