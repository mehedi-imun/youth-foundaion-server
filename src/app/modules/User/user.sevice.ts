import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { fileUploader } from '../../../helpers/fileUploadHelper';
import {
  generateAdminId,
  generateCustomId,
} from '../../../helpers/generateCustomId';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IFile } from '../../../interfaces/file';
import prisma from '../../../shared/prisma';
import { userFilterableFields, userSearchAbleFields } from './user.constant';

const createUser = async (req: Request): Promise<User> => {
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
interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
const getAllUsers = async (
  params: Record<string, any>,
  options: Record<string, any>
): Promise<PaginatedResult<User>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, roles, ...otherFilters } = params; // Separate roles filter
  const conditions: Record<string, any>[] = [{ isDeleted: false }];

  // Search term condition
  if (searchTerm) {
    conditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
console.log(roles)
  // Filter by specific roles if provided
  if (roles) {
    conditions.push({
      roles: { hasSome: roles.split(',') }, // Splitting comma-separated roles if multiple
    });
  }

  // Filtering conditions for other fields
  if (Object.keys(otherFilters).length) {
    conditions.push({
      AND: Object.entries(otherFilters).map(([key, value]) => ({
        [key]: { equals: value },
      })),
    });
  }

  const users = await prisma.user.findMany({
    where: { AND: conditions },
    skip,
    take: limit,
    orderBy: { createdAt: options.sortOrder || 'desc' },
  });

  const total = await prisma.user.count({
    where: { AND: conditions },
  });

  return {
    meta: { page, limit, total },
    data: users,
  };
};
const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id },
  include: {
    userActivity: true,
    donations: true,
    bloodDonor: true,
    FoundationRole: true,
    loginHistory: true,
    UserStatusHistory: true,
    UserActivity: true,
  }, });
  
}
// update user
const updateAUser = async (id: string, data: any): Promise<User | null> => {
  return await prisma.user.update({ where: { id }, data });
};
export const userService = {
  createUser,
  getAllUsers,
  getUserById,
  updateAUser
};
