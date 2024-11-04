import { z } from 'zod';

const foundationPositionValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  userId: z.string(),
  action: z.string().min(1, 'action is required'),
});
const foundationRoleValidation = z.object({
  positionId: z.number().int(),
  startDate: z.date().optional().default(new Date()),
  endDate: z.date().optional().nullable(),
  userId: z.string(),
});

export const foundationValidation = {
  foundationPositionValidation,
  foundationRoleValidation,
};
