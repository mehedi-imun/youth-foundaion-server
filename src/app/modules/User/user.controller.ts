import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.sevice';
import { userFilterableFields } from './user.constant';
import pick from '../../../shared/pick';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Created successfuly!',
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  // console.log(filters)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await userService.getAllUsers(filters,options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users fetched successfully!',
    data: result,
  });
}
);
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.getUserById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully!',
    data: result,
  });
});

 const updateAUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req.body)
  const result = await userService.updateAUser(id, req.body);
  console.log(result)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});

export const userController = {
 createUser,
 getAllUsers,
 getUserById,
updateAUser
};
