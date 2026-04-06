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

