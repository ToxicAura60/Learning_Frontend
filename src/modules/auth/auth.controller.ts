import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import authService from './auth.service';

export const refresh = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  const { access_token, refresh_token, refresh_expires_in } = await authService.refresh(refreshToken);

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: refresh_expires_in * 1000,
  });

  res.status(httpStatus.OK).json({
    data: {
      access_token
    }
  });
});

export const callback = catchAsync(async (req: Request, res: Response) => {
  const { code } = req.body

  const { access_token, refresh_token, id_token, refresh_expires_in } = await authService.callback(code);

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: refresh_expires_in * 1000,
  });

  res.status(httpStatus.OK).json({
    data: {
      access_token,
      id_token
    }
  })
})