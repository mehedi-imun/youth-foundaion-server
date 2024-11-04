import { AccountStatus, UserRole } from '@prisma/client';
import prisma from '../shared/prisma';

// Function to generate custom ID for users
const generateCustomId = async () => {
    const lastUser = await prisma.user.findFirst({
      where: {
        NOT: {
          roles: {
            hasSome: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
          },
        },
      },
      orderBy: {
        customId: 'desc',
      },
    });
    let newIdNumber = 1;
  
    if (lastUser && lastUser.customId) {
      const lastIdNumber = parseInt(lastUser.customId.split('-')[1]);
      newIdNumber = lastIdNumber + 1;
    }
  
    const formattedId = `IYF-${String(newIdNumber).padStart(5, '0')}`; // Format to IYF-00001
    return formattedId;
  };

// Function to generate custom ID for admins and super admins
const generateAdminId = async () => {
  const lastAdmin = await prisma.user.findFirst({
    where: {
      roles: { hasSome: [UserRole.SUPER_ADMIN, UserRole.ADMIN] },
      status: AccountStatus.ACTIVE,
    },
    orderBy: {
      customId: 'desc',
    },
  });
  let newIdNumber = 1;

  if (lastAdmin && lastAdmin.customId) {
    const lastIdNumber = parseInt(lastAdmin.customId.split('-')[1]);
    newIdNumber = lastIdNumber + 1;
  }

  const formattedId = `ADMIN-${String(newIdNumber).padStart(5, '0')}`; // Format to ADMIN-00001
  return formattedId;
};

export { generateAdminId, generateCustomId };
