import { Request, Response } from 'express';
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status';
import courseService from './course.service';

export const createCourse = catchAsync(async (req: Request, res: Response) => {
  const authorId = req.user!.id

  const { title, description, slug } = req.body;

  const course = await courseService.createCourse({
    title,
    description,
    slug,
    authorId
  })

  res.status(httpStatus.CREATED).json({
    data: course
  });
});

export const listCourse = catchAsync(async (_req: Request, res: Response) => {
  const course = await courseService.listCourse()

  res.status(httpStatus.OK).json({
    data: course
  })
})

export const updateCourse = catchAsync(async (req: Request<{courseSlug: string}>, res: Response) => {

  const { title, description, slug } = req.body

  const { courseSlug } = req.params

  const course = await courseService.updateCourse({
    oldSlug: courseSlug,
    title,
    description,
    newSlug: slug
  })

  res.status(httpStatus.OK).json({
    data: course
  })
})

export const deleteCourse = catchAsync(async (req: Request<{courseSlug: string}>, res: Response) => {
  const { courseSlug } = req.params

  await courseService.deleteCourse(courseSlug)

  res.sendStatus(httpStatus.NO_CONTENT)
})


