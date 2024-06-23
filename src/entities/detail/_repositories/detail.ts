import prisma from '@shared/lib/db';
import { DetailEntity, SearchDetailsParams } from '../_domain/types';

class DetailRepository {
  async getDetailsList(params?: SearchDetailsParams) {
    const query = {
      where: {},
      orderBy: {},
      include: {
        discounts: {
          select: {
            percentage: true,
            endDate: true,
            startDate: true,
          },
        },
      },
      take: 10,
    };

    if (!params) {
      const details = await prisma.detail.findMany(query);
      return details;
    }
    const { orderBy, sort, search, novelty, promoted, popular, limit } = params;

    if (search) {
      if (search) {
        query.where = {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        };
      }
    }

    if (novelty) {
      query.where = {
        ...query.where,
        createdAt: { lte: new Date(Date.now() - 60 * 60 * 24 * 14) },
      };
    }

    if (promoted) {
      query.where = {
        ...query.where,
        discountedPrice: { gt: 0 },
      };
    }

    if (popular) {
      query.where = {
        ...query.where,
      };
    }

    if (orderBy || sort) {
      if (orderBy && sort) {
        query.orderBy = { [orderBy]: sort };
      }
    }
    if (limit) {
      query.take = limit;
    }
    return prisma.detail.findMany(query);
  }

  async getDetailById(id: number) {
    return prisma.detail.findUnique({ where: { id } });
  }

  async getDetailByName(name: string) {
    return prisma.detail.findUnique({ where: { name } });
  }
  async createDetail(data: Omit<DetailEntity, 'id'>) {
    return prisma.detail.create({ data });
  }

  async deleteDetails(ids: number[]) {
    return prisma.detail.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async updateDetail(id: number, data: Partial<DetailEntity>) {
    return prisma.detail.update({ where: { id }, data: data });
  }
}

export const detailRepository = new DetailRepository();
