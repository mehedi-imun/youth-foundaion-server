import { AccountStatus, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { generateAdminId, generateCustomId } from '../src/helpers/generateCustomId';
import prisma from '../src/shared/prisma';

const seedSuperAdmin = async () => {
  const hashedPassword = await bcrypt.hash('superadmin', 12);
  const customId = await generateAdminId();
  const customId2 = await generateCustomId();
  console.log('customId:', customId2);
  try {
    // Start a transaction
    const superAdminUser = await prisma.$transaction(async tx => {
      const isExistSuperAdmin = await tx.user.findFirst({
        where: {
          roles: {
            has: UserRole.SUPER_ADMIN,
          },
        },
      });
      if (isExistSuperAdmin) {
        console.log('Super Admin already exists!');
        return null; // Return null if user already exists
      }

      // Create the Super Admin user
      // Generate custom ID
      
      const user = await tx.user.create({
        data: {
          customId: customId, // Add a customId property
          name: 'Super Admin',
          email: 'super@admin.com',
          password: hashedPassword,
          contactNumber: '01234567890',
          address: '123 Admin St',
          roles: [UserRole.SUPER_ADMIN], // Add the missing role property
        },
      });

      // Create associated UserStatusHistory
      await tx.userStatusHistory.create({
        data: {
          userId: user.id, // Linking to the created user
          status: AccountStatus.ACTIVE,
          reason: 'Initial account creation',
        },
      });

      // Create associated UserActivity
      await tx.userActivity.create({
        data: {
          userId: user.id, // Linking to the created user
          action: 'Account created for Super Admin',
        },
      });

      return user;
    });

    // if (superAdminUser) {
    //   console.log('Super Admin created successfully!', superAdminUser);
    // }
  } catch (err) {
    console.error('Error creating Super Admin:', err);
  } finally {
    await prisma.$disconnect();
  }
};

// Run the seed function
seedSuperAdmin();
