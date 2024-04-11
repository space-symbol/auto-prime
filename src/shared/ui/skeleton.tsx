import { cn } from '@shared/lib/utils';
import { useAppearanceDelay } from '../hooks/use-appearance-delay';
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isPending?: boolean;
  appearanceDelay?: number;
}
function Skeleton(props: SkeletonProps) {
  const { className, isPending, appearanceDelay, ...ohterProps } = props;
  const show = useAppearanceDelay(isPending, {
    appearanceDelay,
  });

  if (!show) {
    return null;
  }
  return <div className={cn('animate-pulse rounded-md bg-grayLight', className)} {...ohterProps} />;
}

export { Skeleton };
