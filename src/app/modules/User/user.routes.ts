import express, { NextFunction, Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { fileUploader } from '../../../helpers/fileUploadHelper';
import auth from '../../middlewares/auth';
import { userController } from './user.controller';
import { userValidation } from './user.validation';
const router = express.Router();

router.get(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.getAllUsers
);
router.get(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.getUserById
);
router.put(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.updateUser.parse(req.body.data);
    return userController.updateAUser(req, res, next);
  }
);

router.post(
  '/create-user',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createUser.parse(JSON.parse(req.body.data));
    return userController.createUser(req, res, next);
  },
);
export const userRoutes = router;
