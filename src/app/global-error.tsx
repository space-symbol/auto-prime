'use client';

import { AppButton } from '@/shared/ui/app-button/app-button';

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <div className="flex flex-col gap-4 h-full w-full justify-center items-center">
      <p>{error.message}</p>
      <AppButton
        fullWidth
        onClick={reset}>
        Повторить
      </AppButton>
    </div>
  );
};

export default GlobalError;
