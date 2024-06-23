import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import { getProfileLetters } from '../_vm/get-profile-letters';
import { cn } from '@/shared/lib/utils';
import { UserEntity } from '../client';

interface ProfileAvatarProps {
  className?: string;
  profile?: UserEntity;
}

export const ProfileAvatar = (props: ProfileAvatarProps) => {
  const { className, profile } = props;

  if (!profile) {
    return null;
  }

  return (
    <Avatar className={cn(className, 'border-2 border-border')}>
      <AvatarImage src={profile?.image ?? undefined} />
      <AvatarFallback>{getProfileLetters(profile)}</AvatarFallback>
    </Avatar>
  );
};
