'use client';
import { getProfileQuery, UserId } from '@/entities/user/client';
import { useQuery } from '@tanstack/react-query';
import { ProfileForm } from './profile-form';

interface UpdateProfileFormProps {
  userId: UserId;
  className?: string;
}
export const UpdateProfileForm = (props: UpdateProfileFormProps) => {
  const { userId, className } = props;
  const { data, isPending } = useQuery({
    ...getProfileQuery(userId),
    retry: 0,
  });

  let content = null;

  if (isPending) content = <span>Загрузка профиля...</span>;

  if (!data?.profile) content = <span>Профиль не найден</span>;

  if (data?.profile) {
    content = (
      <ProfileForm
        userId={userId}
        profile={data.profile}
        className={className}
      />
    );
  }
  return <div className=" flex justify-center items-center flex-grow">{content}</div>;
};
