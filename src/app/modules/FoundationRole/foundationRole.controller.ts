import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { foundationRoleService } from './foundationRole.service';

const createFoundationPosition = catchAsync(
  async (req: Request, res: Response) => {
    
    const { userId, name, action } = req.body.data;
   
    const result = await foundationRoleService.createFoundationPosition(
      userId,
      name,
      action,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' foundation position create successfully!',
      data: result,
    });
  },
);

export const foundationRoleController = {
  createFoundationPosition,
};
