import classNames from 'classnames';
import cls from './detail-card.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { DetailEntity } from '../../_domain/types';

interface DetailCardProps {
  className?: string;
  detail: DetailEntity;
  searchValue?: string;
}

export const DetailCard = (props: DetailCardProps) => {
  const {
    className,
    detail: { id, name, price, discountPercentage, quantityAvailable, imageUrl },
    searchValue,
  } = props;

  const renderName = () => {
    if (!searchValue) return <span className={cls.name}>{name}</span>;
    const lowerName = name.toLowerCase();
    const lowerSearchValue = searchValue.toLowerCase();
    const indexOfStartSearchValue = lowerName.indexOf(lowerSearchValue);

    if (indexOfStartSearchValue === -1) return <span className={cls.name}>{name}</span>;
    const indexOfEndSearchValue = indexOfStartSearchValue + lowerSearchValue.length;
    return (
      <span className={classNames(cls.name, 'animate-show')}>
        {name.substring(0, indexOfStartSearchValue)}
        {indexOfStartSearchValue > -1 && indexOfEndSearchValue > indexOfStartSearchValue && (
          <span className={cls.highlight}>
            {name.substring(indexOfStartSearchValue, indexOfEndSearchValue)}
          </span>
        )}
        {name.substring(indexOfEndSearchValue, name.length)}
      </span>
    );
  };

  return (
    <Link
      className={cls.card}
      href={`/store/${id}`}>
      <div className={classNames(cls.imageContainer)}>
        <Image
          className={cls.image}
          src={imageUrl}
          alt={name}
          width={200}
          height={200}
        />
      </div>

      {renderName()}
      <div className={cls.footer}>
        <div className={cls.priceWrapper}>
          {discountPercentage ? (
            <>
              <div className={cls.price}>
                {Math.floor(price - (discountPercentage / 100) * price)} ₽
              </div>
              <s className={cls.discountPrice}>{price} ₽</s>
            </>
          ) : (
            <div className={cls.price}>{price} ₽</div>
          )}
        </div>
        {quantityAvailable > 0 && (
          <span className={cls.quantityAvailable}>в наличии: {quantityAvailable}</span>
        )}
      </div>
    </Link>
  );
};
