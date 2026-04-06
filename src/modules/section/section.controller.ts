import { Request, Response } from 'express';
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status';
import sectionService from './section.service';

export const createSection = catchAsync(async (req: Request<{courseSlug: string;}>, res: Response) => {
  const { title, order, slug } = req.body

  const course = await sectionService.createSection({
    courseSlug: req.params.courseSlug,
    title,
    order,
    slug
  })

  res.status(httpStatus.CREATED).json({
    data: course
  });
});

