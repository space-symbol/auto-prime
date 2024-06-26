import classNames from 'classnames';
import cls from './divider.module.css';
interface DividerProps {
  className?: string;
}

export const Divider = (props: DividerProps) => {
  const { className } = props;

  return <div className={classNames(cls.divider, className)}>Или войдите через</div>;
};
