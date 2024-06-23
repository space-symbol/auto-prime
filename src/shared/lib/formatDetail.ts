import { Detail } from '@prisma/client';

export const formatDetail = (detail: Detail) => {
  if (!detail) {
    return detail;
  }
  const { discountedPrice, price, ...rest } = detail;
  return {
    price: price.toNumber(),
    discountedPrice: discountedPrice?.toNumber() ?? null,
    ...rest,
  };
};
