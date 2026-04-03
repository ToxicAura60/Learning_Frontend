import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import userService from '../user/user.service';
import authService from './auth.service';

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userService.createUser({email, password})
  res.status(httpStatus.CREATED).json({
    data: {
      id: user.id,
      email: user.email,
    }
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,  
  });

  res.status(httpStatus.OK).json({
    data: {
      user,
      accessToken
    }
  });
});

