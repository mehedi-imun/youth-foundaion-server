import { UserRole } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { foundationRoleController } from './foundationRole.controller';
import { foundationValidation } from './foundationRole.validation';
const router = express.Router();

router.post(
  '/create-position',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body.data = foundationValidation.foundationPositionValidation.parse(
      req.body.data,
    );
    return foundationRoleController.createFoundationPosition(req, res, next);
  },
);
export const foundationRoleRoutes = router;