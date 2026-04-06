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

