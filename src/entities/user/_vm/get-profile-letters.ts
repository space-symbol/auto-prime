import { getProfileDisplayName } from './get-profile-display-name';
import { UserEntity } from '@entities/user/_domain/types';

export const getProfileLetters = (profile: UserEntity) => {
  const displayName = getProfileDisplayName(profile);
  const [a, b] = displayName
    .replace(/`|'|/g, '')
    .split('@')[0]
    .split(/[.|\s|-|_]/);

  if (!b) {
    return `${a[0]?.toUpperCase() ?? ''}${a[1]?.toUpperCase() ?? ''}`;
  }
  return `${a[0]?.toUpperCase() ?? ''}${b[0]?.toUpperCase() ?? ''}`;
};
