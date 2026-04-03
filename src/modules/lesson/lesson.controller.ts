import { Request, Response } from 'express';
import catchAsync from "../../utils/catchAsync";
import lessonService from "./lesson.service";
import httpStatus from 'http-status';

export const createLesson = catchAsync(async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const lesson = await lessonService.createLesson({title, content})
  res.status(httpStatus.CREATED).json({
    data: {
      id: lesson.id,
      title: lesson.title,
      content: lesson.content,
    }
  });
});

