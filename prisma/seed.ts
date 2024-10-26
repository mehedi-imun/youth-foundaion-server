import { Role, AccountStatus } from "@prisma/client";
import prisma from "../src/shared/prisma";
import * as bcrypt from 'bcrypt';
import {generateAdminId}  from '../src/helpers/generateCustomId';

const seedSuperAdmin = async () => {
    const hashedPassword = await bcrypt.hash("superadmin", 12);

    try {
        // Start a transaction
        const superAdminUser = await prisma.$transaction(async (tx) => {
            // Check if a Super Admin already exists
            const isExistSuperAdmin = await tx.user.findFirst({
                where: {
                    UserRole: {
                        some: {
                            role: Role.SUPER_ADMIN,
                        },
                    },
                },
            });
console.log(isExistSuperAdmin);
            if (isExistSuperAdmin) {
                console.log("Super Admin already exists!");
                return null; // Return null if user already exists
            }

            // Create the Super Admin user
              // Generate custom ID
              const customId = await generateAdminId();
            const user = await tx.user.create({
                data: {
                    customId:customId , // Add a customId property
                    name: "Super Admin",
                    email: "super@admin.com",
                    password: hashedPassword,
                    phone: "01234567890",
                    address: "123 Admin St",
                    status: AccountStatus.ACTIVE,
                }
            });

            // Create associated UserRole
            await tx.userRole.create({
                data: {
                    role: Role.SUPER_ADMIN,
                    userId: user.id, // Linking to the created user
                }
            });

            // Create associated UserStatusHistory
            await tx.userStatusHistory.create({
                data: {
                    userId: user.id, // Linking to the created user
                    status: AccountStatus.ACTIVE,
                    reason: "Initial account creation",
                }
            });

            // Create associated UserActivity
            await tx.userActivity.create({
                data: {
                    userId: user.id, // Linking to the created user
                    action: "Account created for Super Admin",
                }
            });

            return user; // Return the created user
        });

        if (superAdminUser) {
            console.log("Super Admin created successfully!", superAdminUser);
        }
    } catch (err) {
        console.error("Error creating Super Admin:", err);
    } finally {
        await prisma.$disconnect();
    }
};

// Run the seed function
seedSuperAdmin();
