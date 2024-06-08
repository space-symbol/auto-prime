import classNames from 'classnames';
import cls from './detail-card.module.css';
import Image from 'next/image';
import { DetailEntity } from '../../_domain/types';
import { useState } from 'react';
import { currencyFormatter } from '@shared/lib/currencyFormatter';
import { AppLink, AppLinkVariant } from '@/shared/ui/app-link/app-link';

interface DetailCardProps {
  className?: string;
  detail: DetailEntity;
  searchValue?: string;
  horizontal?: boolean;
  variant?: AppLinkVariant;
}

const { format } = currencyFormatter;

export const DetailCard = (props: DetailCardProps) => {
  const {
    className,
    detail: { id, name, price, discountPercentage, quantityAvailable, images, discountEndDate, priceAfterDiscount },
    searchValue,
    variant = 'underlined',
  } = props;
  const [timeToEnd, setTimeToEnd] = useState<string>();

  const renderName = () => {
    if (!searchValue) return <span className={cls.name}>{name}</span>;
    const lowerName = name.toLowerCase();
    const lowerSearchValue = searchValue.toLowerCase();
    const indexOfStartSearchValue = lowerName.indexOf(lowerSearchValue);

    if (indexOfStartSearchValue === -1) return <span className={cls.name}>{name}</span>;
    const indexOfEndSearchValue = indexOfStartSearchValue + lowerSearchValue.length;
    return (
      <span className={cls.name}>
        {name.substring(0, indexOfStartSearchValue)}
        {indexOfStartSearchValue > -1 && indexOfEndSearchValue > indexOfStartSearchValue && (
          <span className={cls.highlight}>{name.substring(indexOfStartSearchValue, indexOfEndSearchValue)}</span>
        )}
        {name.substring(indexOfEndSearchValue, name.length)}
      </span>
    );
  };
  return (
    <AppLink
      variant={variant}
      fullwidth
      className={classNames(className)}
      href={`/store/main/${id}`}>
      <div className={cls.card}>
        <div className={cls.saleBar}>
          {discountPercentage > 0 && <span className={cls.sale}>-{discountPercentage}%</span>}
          {discountEndDate && <span className={cls.sale}>{timeToEnd}</span>}
        </div>
        <div className={classNames(cls.imageContainer)}>
          <Image
            className={cls.image}
            src={images[0]}
            alt={name}
            width={1600}
            height={900}
          />
        </div>
        <div className={cls.content}>
          {renderName()}
          <div className={cls.footer}>
            <div className={cls.priceWrapper}>
              {discountPercentage ? (
                <>
                  <div className={cls.price}>{format(priceAfterDiscount)}</div>
                  <s className={cls.discountPrice}>{format(price)}</s>
                </>
              ) : (
                <div className={cls.price}>{format(price)}</div>
              )}
            </div>
            {quantityAvailable > 0 && <span className={cls.quantityAvailable}>в наличии: {quantityAvailable}</span>}
          </div>
        </div>
      </div>
    </AppLink>
  );
};
