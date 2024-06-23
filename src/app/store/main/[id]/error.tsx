'use client';
import { useRouter } from 'next/navigation';

const DetailAboutError = ({ error, reset }: CustomError) => {
  const router = useRouter();
  let content = 'Что-то пошло не так';

  return (
    <div className="flex flex-col gap-4 h-full w-full justify-center items-center">
      <h2>{content}</h2>
      <div className="flex gap-4">
        <button onClick={() => router.back()}>Вернуться</button>
        <button onClick={() => reset()}>Перезагрузить</button>
      </div>
    </div>
  );
};
export default DetailAboutError;
