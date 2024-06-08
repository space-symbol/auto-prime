'use server';
import { DetailBase, updateDetailUseCase } from '@/entities/detail/client';
import { detailRepository } from '@/entities/detail/server';
import { BadRequest } from '@/shared/lib/errors';
import { fileStorage } from '@/shared/lib/file-storage';

export const updateDetailAction = async (id: number, fields: FormData) => {
  const detail = await detailRepository.getDetailById(id);
  if (!detail) {
    throw new Error('Деталь не найдена');
  }

  const images = fields.getAll('images') || [];

  if (!images?.length || !images.every((image) => image instanceof File)) {
    throw new BadRequest('Необходимо загрузить хотя бы одно изображение');
  }

  const newImagesPromises = images.map(async (image) => {
    const storedImage = await fileStorage.uploadImage(image as File, 'detail-images');
    return storedImage.path;
  });

  const imagesPaths = await Promise.all(newImagesPromises);

  const newDetail: DetailBase = {
    name: fields.get('name') as string,
    description: fields.get('description') as string,
    price: Number(fields.get('price')),
    discountPercentage: Number(fields.get('discountPercentage')),
    discountEndDate: fields.get('discountEndDate') ? new Date(fields.get('discountEndDate') as string) : null,
    quantityAvailable: Number(fields.get('quantityAvailable')),
    images: imagesPaths,
  };
  return await updateDetailUseCase.execute(id, newDetail);
};
