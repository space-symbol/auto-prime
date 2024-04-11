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
      query.where = {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      };
    }
    if (order && sort) {
      query.orderBy = {
        [order]: sort,
      };
    }
    const data = await prisma.detail.findMany(query);
    console.log(data);
    return data;
  }
}

export const detailRepository = new DetailRepository();
