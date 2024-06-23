import { UserEntity } from '../_domain/types';

export const getProfileDisplayName = (profile: UserEntity) => {
  return profile.name ? profile.name : profile.email;
};
