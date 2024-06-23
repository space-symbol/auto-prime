'use server';
import { profileSchema, UserId } from '@/entities/user/client';
import { getAppSessionServer, updateProfileUseCase } from '@/entities/user/server';
import { NeedAuthError } from '@/shared/lib/errors';
import { z } from 'zod';
import { fileStorage } from '@/shared/lib/file-storage';
import { updateProfileSchema } from '../_domain/schemas';

const propsShcema = z.object({
  userId: z.custom<UserId>(),
  data: updateProfileSchema,
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const updateProfileAction = async (props: z.infer<typeof propsShcema>) => {
  const { userId, data } = propsShcema.parse(props);
  const session = await getAppSessionServer();

  if (!session) {
    throw new NeedAuthError('Необходима авторизация');
  }
  const { image: formData, ...rest } = data;
  let user = null;

  if (formData) {
    const imageFromFormData = formData.get('image') as File;
    const imagePath = (await fileStorage.uploadImage(imageFromFormData, 'profile-image')).path;

    user = await updateProfileUseCase.execute({
      userId,
      session,
      data: {
        ...rest,
        image: imagePath,
      },
    });
  } else {
    user = await updateProfileUseCase.execute({
      userId,
      session,
      data: {
        ...rest,
      },
    });
  }

  return resultSchema.parseAsync({
    profile: user,
  });
};
