'use client';
import { useAppSession } from '@/entities/user/client';
import { UpdateProfileForm } from '@/features/profile/client';

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useAppSession();
  if (!session)
    return (
      <div className="flex h-full justify-center items-center">
        <h2>Вы не авторизованы!</h2>
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <h1>Профиль</h1>
      <UpdateProfileForm
        className="max-w-[40rem]"
        userId={params.id}
      />
    </div>
  );
};

export default ProfilePage;
