import { FoundationPosition } from '@prisma/client';
import prisma from '../../../shared/prisma';
const createFoundationPosition = async (
  userId: string,
  name: string,
  action: string,
): Promise<FoundationPosition> => {
  return await prisma.$transaction(async tx => {
    const result = await tx.foundationPosition.create({
      data: { name },
    });

    await tx.userActivity.create({
      data: {
        userId,
        action,
      },
    });
    return result;
  });
};

export const foundationRoleService = {
  createFoundationPosition,
};
