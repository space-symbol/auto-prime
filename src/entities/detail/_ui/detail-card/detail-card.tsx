import { cn } from '@/shared/lib/utils';
import cls from './detail-card.module.css';
import Image from 'next/image';
import { DetailEntityWithDiscounts } from '../../_domain/types';
import { currencyFormatter } from '@shared/lib/currencyFormatter';
import { AppLink, AppLinkVariant } from '@/shared/ui/app-link/app-link';

interface DetailCardProps {
  className?: string;
  detail: DetailEntityWithDiscounts;
  searchValue?: string;
  horizontal?: boolean;
  variant?: AppLinkVariant;
}

const { format } = currencyFormatter;

export const DetailCard = (props: DetailCardProps) => {
  const {
    className,
    detail: { id, name, price, discountedPrice, quantityAvailable, images, discounts },
    searchValue,
    variant = 'underlined',
  } = props;

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
      className={cn(className)}
      href={`/store/main/${id}`}>
      <div className={cls.card}>
        <div className={cls.saleBar}></div>
        <div className={cn(cls.imageContainer)}>
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
              {discountedPrice ? (
                <>
                  <div className={cls.price}>{format(discountedPrice)}</div>
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
