import { Request, Response } from 'express';
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status';
import sectionService from './section.service';

export const createSection = catchAsync(async (req: Request<{courseSlug: string;}>, res: Response) => {
  const { title, order, slug } = req.body

  const section = await sectionService.createSection({
    courseSlug: req.params.courseSlug,
    title,
    order,
    slug
  })

  res.status(httpStatus.CREATED).json({
    data: section
  });
});

export const listSection = catchAsync(async (req: Request<{courseSlug: string;}>, res: Response) => {

  const { courseSlug } = req.params

  const section = await sectionService.listSection(courseSlug)

  res.status(httpStatus.OK).json({
    data: section
  })

})

export const updateSection = catchAsync(async (req: Request<{courseSlug: string, sectionSlug: string}>, res: Response) => {

  const { courseSlug, sectionSlug } = req.params

  const { title, order, slug } = req.body

  const section = await sectionService.updateSection({
    courseSlug,
    oldSlug: sectionSlug,
    title,
    order,
    newSlug: slug
  })

  res.status(httpStatus.OK).json({
    data: section
  })
})

export const deleteSection = catchAsync(async (req: Request<{courseSlug: string, sectionSlug: string}>, res: Response) => {

  const { courseSlug, sectionSlug } = req.params

  await sectionService.deleteSection({
    courseSlug,
    slug: sectionSlug
  })

  res.sendStatus(httpStatus.NO_CONTENT)
})