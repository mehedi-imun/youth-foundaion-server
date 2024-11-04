import { UserActivity } from '@prisma/client';
import prisma from '../shared/prisma';

export async function logUserActivity(
  userId: string,
  action: string,
): Promise<UserActivity> {
  const result = prisma.userActivity.create({
    data: {
      userId,
      action,
    },
  });

  return result;
}
