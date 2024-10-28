import { UserRole } from '@prisma/client';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'), // Ensure name is a non-empty string
  email: z.string().email('Invalid email address').optional(), // Ensure email is valid
  contactNumber: z.string().min(10, 'Contact number must be at least 10 characters long'), // Adjust length as needed
  address: z.string().min(1, 'Address is required'), // Ensure address is a non-empty string
  roles: z.array(z.enum(Object.values(UserRole) as [UserRole, ...UserRole[]]))

});

const createUser = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'), 
  action: z.string().min(1, 'action is required'), // Ensure reason is a non-empty string
  user: userSchema, // Validate user data
});

export const userValidation = {
   createUser,
};
