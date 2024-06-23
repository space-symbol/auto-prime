'use server';
import { z } from 'zod';
import { getUserUseCase } from '../_use-cases/get-user';
import { getAppSessionStrictServer } from '../_vm/get-session.server';
import { profileSchema } from '../_domain/shemas';

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const getUserProfileAction = async (props: z.infer<typeof propsSchema>) => {
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const user = await getUserUseCase.execute({
    session,
    userId,
  });

  return resultSchema.parseAsync({
    profile: user,
  });
};
