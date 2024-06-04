'use server';
import { DetailBase } from '@/entities/detail/_domain/types';
import { detailRepository } from '@/entities/detail/_repository/detail.repository';
import { createDetailUseCase } from '@/entities/detail/detail';
import { getAppSessionServer } from '@/entities/user/server';
import { privateConfig } from '@/shared/config/private';
import { AuthorizatoinError, BadRequest } from '@/shared/lib/errors';
import { fileStorage } from '@/shared/lib/file-storage';

export const createDetailAction = async (detailFormData: FormData) => {
  const session = await getAppSessionServer();
  if (!privateConfig.ADMIN_EMAILS?.includes(session?.user.email ?? '')) {
    throw new AuthorizatoinError('Доступ запрещен');
  }

  const detailExists = await detailRepository.getDetailByName(detailFormData.get('name') as string);
  if (detailExists) {
    throw new BadRequest('Такой продукт уже существует');
  }

  let price = Number.parseFloat(detailFormData.get('price') as string);

  if (!price) {
    throw new BadRequest('Необходимо указать цену');
  }

  if (Number(price) < 0) {
    throw new BadRequest('Цена не может быть отрицательной');
  }

  if (detailFormData.get('discountPercentage')) {
    const discountPercentage = Number.parseInt(detailFormData.get('discountPercentage') as string);

    if (!detailFormData.get('discountEndDate')) {
      throw new BadRequest('Необходимо указать дату окончания скидки');
    }

    if (new Date(detailFormData.get('discountEndDate') as string).getTime() < new Date().getTime()) {
      throw new BadRequest('Дата окончания скидки не может быть меньше текущей');
    }

    if (discountPercentage < 0) {
      throw new BadRequest('Скидка не может быть меньше 0%');
    }

    if (discountPercentage > 100) {
      throw new BadRequest('Скидка не может быть больше 100%');
    }

    price = price - (price / 100) * discountPercentage;
  }

  const images = (detailFormData.getAll('images') || []) as File[];

  if (!images.every((image) => image instanceof File)) {
    throw new BadRequest('Необходимо загрузить хотя бы одно изображение');
  }

  const newImagesPromises = images.map(async (image: File) => {
    const storedImage = await fileStorage.uploadImage(image, 'detail-images');
    return storedImage.path;
  });
  const imagesPaths = await Promise.all(newImagesPromises);

  const detail: DetailBase = {
    name: detailFormData.get('name') as string,
    description: detailFormData.get('description') as string,
    price: price,
    discountPercentage: Number(detailFormData.get('discountPercentage')),
    discountEndDate: detailFormData.get('discountEndDate')
      ? new Date(detailFormData.get('discountEndDate') as string)
      : null,
    quantityAvailable: Number(detailFormData.get('quantityAvailable')),
    images: imagesPaths,
  };

  return createDetailUseCase.execute(detail);
};
