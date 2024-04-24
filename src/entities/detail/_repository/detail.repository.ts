import prisma from '@shared/lib/db';
import { SearchOptions } from '../_domain/types';
import { Detail } from '@prisma/client';

class DetailRepository {
  async getDetailsByParams(searchOptions?: SearchOptions): Promise<Detail[]> {
    if (!searchOptions) return prisma.detail.findMany();
    const { order, sort, searchValue: search } = searchOptions;

    const query = {
      where: {},
      orderBy: {},
    };

    if (search) {
      if (search) {
        query.where = {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        };
      }
      if (order && sort) {
        query.orderBy = { [order]: sort };
      }
    }
    return prisma.detail.findMany(query);
  }
  async getDetailById(id: number): Promise<Detail | null> {
    return await prisma.detail.findUnique({ where: { id } });
  }

  async getPopularDetails(take: number = 10): Promise<Detail[]> {
    return await prisma.detail.findMany({
      orderBy: { quantityOrdered: 'desc' },
      take: take,
    });
  }
  async getPromitedDetails(): Promise<Detail[]> {
    return await prisma.detail.findMany({
      where: {
        OR: [
          {
            promotionId: { not: null },

            discountPercentage: { gt: 0 },
          },
        ],
      },
      include: { promotion: true },
    });
  }
  async getNewDetails(): Promise<Detail[]> {
    return prisma.detail.findMany({ where: { discountPercentage: { gt: 0 } } });
  }
}

export const detailRepository = new DetailRepository();
