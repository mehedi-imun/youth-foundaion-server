import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { fileUploader } from '../../../helpers/fileUploadHelper';
import {
  generateAdminId,
  generateCustomId,
} from '../../../helpers/generateCustomId';
import { IFile } from '../../../interfaces/file';
import prisma from '../../../shared/prisma';

export const createUser = async (req: Request): Promise<User> => {
  const { user, password, action } = req.body;
  const file = req.file as IFile;
  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 12);
  // Upload the user's image if a file is provided
  const uploadedImageUrl = file
    ? (await fileUploader.uploadToCloudinary(file))?.secure_url
    : undefined;
  // Generate custom ID based on role
  const userRoles = user.roles as UserRole[];
  const customId =
    userRoles.includes(UserRole.ADMIN) ||
    userRoles.includes(UserRole.SUPER_ADMIN)
      ? await generateAdminId()
      : await generateCustomId();
  // Prepare user data for insertion
  const userData = {
    customId,
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
    address: user.address,
    image: uploadedImageUrl,
    password: hashedPassword,
    roles: user.roles,
  };
  // Begin transaction to create user and associated activity log
  const newUser = await prisma.$transaction(async tx => {
    const createdUser = await tx.user.create({ data: userData });
    await tx.userActivity.create({
      data: {
        userId: createdUser.id,
        action,
      },
    });
    return createdUser;
  });
  return newUser;
};
export const userService = {
  createUser,
};
