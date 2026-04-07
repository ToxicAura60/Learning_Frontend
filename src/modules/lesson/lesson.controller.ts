import { Request, Response } from 'express';
import catchAsync from "../../utils/catchAsync";
import lessonService from "./lesson.service";
import httpStatus from 'http-status';

export const createLesson = catchAsync(async (req: Request<{courseSlug: string, sectionSlug: string}>, res: Response) => {

  const { title, content, order, slug } = req.body;

  const { courseSlug, sectionSlug } = req.params

  const lesson = await lessonService.createLesson({courseSlug, sectionSlug, title, content, order, slug })
  res.status(httpStatus.CREATED).json({
    data: {
      id: lesson.id,
      title: lesson.title,
      content: lesson.content,
    }
  });
});

export const listLesson = catchAsync(async (req: Request<{courseSlug: string, sectionSlug: string}>, res: Response) => {

  const { courseSlug, sectionSlug } = req.params

  const lesson = await lessonService.listLesson({courseSlug, sectionSlug});

  res.status(httpStatus.OK).json({
    data: lesson 
  })
})


export const updateLesson = catchAsync(async (req: Request<{courseSlug: string, sectionSlug: string, lessonSlug: string}>, res: Response) => {

  const { title, content, order, slug } = req.body

  const { courseSlug, sectionSlug, lessonSlug } = req.params

  const lesson = await lessonService.updateLesson({
    courseSlug,
    sectionSlug,
    oldSlug: lessonSlug,
    title,
    content,
    order,
    newSlug: slug
  })

  res.status(httpStatus.OK).json({
    data: lesson
  })
})

export const deleteLesson = catchAsync(async (req: Request<{courseSlug: string, sectionSlug: string, lessonSlug: string}>, res: Response) => {

  const { courseSlug, sectionSlug, lessonSlug } = req.params

  await lessonService.deleteLesson({
    courseSlug,
    sectionSlug,
    lessonSlug
  })

  res.sendStatus(httpStatus.NO_CONTENT);

})