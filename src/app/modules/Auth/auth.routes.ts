import express from 'express';
import { UserRole } from '@prisma/client';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post(
    '/login',
    AuthController.loginUser
);
export const AuthRoutes = router;