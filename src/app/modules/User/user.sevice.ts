import { User, AccountStatus, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
// import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { generateAdminId } from '../../../helpers/generateCustomId';
import { IFile } from '../../../interfaces/file';
import prisma from '../../../shared/prisma';
import { fileUploader } from '../../../helpers/fileUploadHelper';

export const createAdmin = async (req: Request): Promise<User> => {
  const file = req.file as IFile;
    const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
    let uploadedImageUrl: string | undefined;

    // If an image file is provided, upload it to Cloudinary
    if (file) {
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
      uploadedImageUrl = uploadToCloudinary?.secure_url;
    }
    const customId = await generateAdminId();
    // Begin transaction
    const newAdmin = await prisma.$transaction(async (tx) => {
      // Create the admin user
      const user = await tx.user.create({
        data: {
          customId,
          name: req.body.data.name,
          email: req.body.data.email,
          contactNumber: req.body.data.contactNumber,
          address: req.body.data.address,
          image: uploadedImageUrl,
          password: hashedPassword,
          status: AccountStatus.ACTIVE,  // Set initial status
        },
      });

      // Assign the admin role to the user
      await tx.userRole.create({
        data: {
          userId: user.id,
          role: Role.ADMIN, // Assigning the admin role
        },
      });

      // Create an entry in the user status history
      await tx.userStatusHistory.create({
        data: {
          userId: user.id,
          status: AccountStatus.ACTIVE,
          reason: 'Initial account creation for Admin',
        },
      });

      return user;
    });

    console.log('Admin created successfully with role and status history.');
    return newAdmin;



};

export const userService = {
    createAdmin,
    };