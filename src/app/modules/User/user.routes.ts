import express, { NextFunction, Request, Response } from 'express';
// import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { fileUploader } from '../../../helpers/fileUploadHelper';
import { userController } from './user.controller';
import { userValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-admin',
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res, next);
  },
);
export const userRoutes = router;
