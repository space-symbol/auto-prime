'use server';
import { getDetailByIdUseCase } from '@/entities/detail/server';
import { DetailBase } from '@/entities/detail/client';
import { updateDetailUseCase } from '@/entities/detail/server';
import { BadRequest } from '@/shared/lib/errors';
import { fileStorage } from '@/shared/lib/file-storage';
import { formatDetail } from '@/shared/lib/formatDetail';

export const updateDetailAction = async (id: number, fields: FormData) => {
  const detail = await getDetailByIdUseCase.execute(id);
  if (!detail) {
    throw new Error('Деталь не найдена');
  }

  const images = fields.getAll('images') || [];

  if (!images?.length) {
    throw new BadRequest('Необходимо загрузить хотя бы одно изображение');
  }

  const newImagesPromises = images.map(async (image) => {
    const storedImage = await fileStorage.uploadImage(image as File, 'detail-images');
    return storedImage.path;
  });

  const imagesPaths = await Promise.all(newImagesPromises);

  const newDetail: Partial<DetailBase> = {
    name: fields.get('name') as string,
    description: fields.get('description') as string,
    price: Number(fields.get('price')),
    discountedPrice: Number(fields.get('discountedPrice')),
    quantityAvailable: Number(fields.get('quantityAvailable')),
    images: imagesPaths,
  };
  const updatedDetail = await updateDetailUseCase.execute(id, newDetail);
  return formatDetail(updatedDetail);
};
