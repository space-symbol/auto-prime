import prisma from '@shared/lib/db';
import { Detail, Prisma } from '@prisma/client';
import { DetailBase, DetailEntity, SearchDetailsParams } from '../_domain/types';
import { DefaultArgs } from '@prisma/client/runtime/library';

class DetailRepository {
  async getDetailsList(params?: SearchDetailsParams): Promise<DetailEntity[]> {
    const query: Prisma.DetailFindManyArgs<DefaultArgs> = {
      where: {},
      orderBy: {},
      select: {
        id: true,
        name: true,
        price: true,
        quantityOrdered: true,
        discountPercentage: true,
        discountEndDate: true,
        images: true,
        description: true,
        quantityAvailable: true,
      },
    };

    if (!params) {
      return prisma.detail.findMany(query);
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
        OR: [
          {
            promotionId: { not: null },
          },
          {
            discountPercentage: { gt: 0 },
          },
        ],
      };
    }

    if (popular) {
      query.where = {
        ...query.where,
        quantityOrdered: { gt: 0 },
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
  async getDetailById(id: number): Promise<Detail | null> {
    return prisma.detail.findUnique({ where: { id } });
  }

  async getDetailByName(name: string): Promise<Detail | null> {
    return prisma.detail.findUnique({ where: { name } });
  }
  async createDetail(data: DetailBase): Promise<Detail> {
    return prisma.detail.create({ data: data });
  }

  async deleteDetails(ids: number[]) {
    return prisma.detail.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async updateDetail(id: number, data: Partial<DetailBase>): Promise<Detail> {
    return prisma.detail.update({ where: { id }, data: data });
  }
}

export const detailRepository = new DetailRepository();
