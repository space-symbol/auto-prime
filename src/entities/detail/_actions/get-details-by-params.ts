'use server';
import { detailRepository } from '@entities/detail/_repository/detail.repository';
import { SearchOptions } from '../_domain/types';

export const getDetailsByParamsAction = async (searchOptions?: SearchOptions) => {
  return detailRepository.getDetailsByParams(searchOptions);
};
