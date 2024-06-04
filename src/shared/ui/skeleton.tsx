import { cn } from '@shared/lib/utils';
import { useAppearanceDelay } from '../hooks/use-appearance-delay';
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isPending?: boolean;
  appearanceDelay?: number;
  minDisplay?: number;
}
function Skeleton(props: SkeletonProps) {
  const { className, isPending, appearanceDelay, minDisplay, ...ohterProps } = props;
  const show = useAppearanceDelay(isPending, { appearanceDelay, minDisplay });

  if (!show) {
    return null;
  }

  return (
    <div
      className={cn('animate-pulse rounded-md bg-skeleton static', className)}
      {...ohterProps}
    />
  );
}

export { Skeleton };
