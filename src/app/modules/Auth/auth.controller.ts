import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthServices } from './auth.service';
import { getClientIp } from '@supercharge/request-ip';
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const ip = getClientIp(req)
  const result = await AuthServices.loginUser(req.body,ip);

  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully!',
    data: {
      accessToken: result.accessToken,
    },
  });
});

export const AuthController = {
  loginUser,
};
