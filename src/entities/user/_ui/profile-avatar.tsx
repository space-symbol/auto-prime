import { Profile } from '../_domain/types';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import { getProfileLetters } from '../_lib/get-profile-letters';
import { cn } from '@shared/lib/utils';

interface ProfileAvatarProps {
  className?: string;
  profile?: Profile;
}

export const ProfileAvatar = (props: ProfileAvatarProps) => {
  const { className, profile } = props;

  if (!profile) {
    return null;
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={profile.image ?? ''} />
      <AvatarFallback>{getProfileLetters(profile)}</AvatarFallback>
    </Avatar>
  );
};
