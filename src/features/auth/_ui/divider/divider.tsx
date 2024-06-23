import { cn } from '@/shared/lib/utils';
import cls from './divider.module.css';
interface DividerProps {
  className?: string;
}

export const Divider = (props: DividerProps) => {
  const { className } = props;

  return <div className={cn(cls.divider, className)}>Или войдите через</div>;
};
