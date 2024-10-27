import { z } from 'zod';

const createAdmin = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  contactNumber: z.string().min(10).max(15),
  address: z.string().max(200).optional(),
});

const updateAdminSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  contactNumber: z.string().min(10).max(15).optional(),
  address: z.string().max(100).optional(),
});

export const userValidation = {
    createAdmin,
}