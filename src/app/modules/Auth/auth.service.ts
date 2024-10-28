import { AccountStatus } from '@prisma/client';

import * as bcrypt from 'bcrypt'
import prisma from '../../../shared/prisma';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
const loginUser = async (payload: { email: string; password: string },ip: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: AccountStatus.ACTIVE,
    },
  });
if (!userData) {
    throw new ApiError(404, "User not found!")}
  const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);
  if (!isCorrectPassword) {
      throw new ApiError(401, "Password incorrect!")
  }
  const accessToken = jwtHelpers.generateToken({
      email: userData.email,
      role: userData.roles
  },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken({
      email: userData.email,
      role: userData.roles
  },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
  );
  await prisma.loginHistory.create({
    data: {
      userId: userData.id,
      ipAddress: ip || null, 
    },
  });
  return {
      accessToken,
      refreshToken,
  };
};

export const AuthServices = {
  loginUser,
};
