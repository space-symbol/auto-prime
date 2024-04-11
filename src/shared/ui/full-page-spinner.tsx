import { useAppearanceDelay } from '../hooks/use-appearance-delay';
import { Spinner } from './spinner/spinner';

export const FullPageSpinner = () => {
  const show = useAppearanceDelay();
  return (
    <div className={'inset-0 h-full flex items-center justify-center absolute'}>
      {show && <Spinner className={'w-10 h-10'} />}
    </div>
  );
};
