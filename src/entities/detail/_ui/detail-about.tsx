import classNames from 'classnames';
import { DetailEntity } from '../detail';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { AppButton } from '@/shared/ui/app-button/app-button';
import { useState } from 'react';
import { AppInput } from '@/shared/ui/app-input/app-input';
import Plus from '@/shared/public/assets/icons/plus.svg';
import Minus from '@/shared/public/assets/icons/minus.svg';
import { formatter } from '@/shared/lib/currencyFormatter';

interface DetailAboutProps {
  className?: string;
  detail: DetailEntity;
}
const { format } = formatter;

export const DetailAbout = ({ className, detail }: DetailAboutProps) => {
  const { name, description, price, images, discountPercentage, discountEndDate, quantityAvailable } = detail;
  const [isCanceled, setIsCanceled] = useState(false);
  const [amount, setAmount] = useState(1);

  const formattedPrice = format(price);
  const discount = discountPercentage / 1000;
  return (
    <div className={cn(classNames('flex flex-col gap-6 pb-10', className))}>
      <h1>{name}</h1>
      <div className="flex flex-col grid-rows-2 grid-flow-row gap-6 md:grid-rows-1 md:grid md:grid-cols-5">
        <Image
          className="w-full h-full object-cover col-span-3 rounded-sm"
          src={images[0]}
          width={1920}
          height={1080}
          alt={detail.name}
        />
        <div className="flex flex-col gap-6 col-span-2 justify-end">
          <div className="font-rubik flex flex-col gap-4 items-center">
            <div className="font-rubik flex flex-col items-center md:items-start">
              <div className="flex gap-2 whitespace-nowrap items-start w-full text-xl">
                <span className="text-accent">
                  {amount <= 1 || Number.isNaN(amount) ? formattedPrice : format(price * amount)}
                </span>
                {discountPercentage > 0 && (
                  <s className="text-foreground-secondary text-base select-none">
                    {amount <= 1 || Number.isNaN(amount)
                      ? format(price + price * discount)
                      : format(price * amount + price * amount * discount)}
                  </s>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center gap-4 justify-center relative flex-shrink-0 max-w-44">
                <AppButton
                  disabled={amount <= 1}
                  theme={'transparent'}
                  className="absolute left-0 h-4 w-4 text-base"
                  onClick={() => setAmount((prev) => prev - 1)}
                  LeftIcon={Minus}
                />
                <AppInput
                  min={1}
                  max={quantityAvailable}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value);
                    if (value <= quantityAvailable || !value) {
                      setAmount(value);
                    }
                  }}
                  onBlur={(e) => {
                    const value = Number.parseInt(e.target.value);
                    if (Number.isNaN(value) || value < 1) {
                      setIsCanceled(true);
                      setAmount(1);
                      setTimeout(() => {
                        setIsCanceled(false);
                      }, 400);
                      console.log(isCanceled);
                    }
                  }}
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  type="number"
                  inputMode="numeric"
                  className={classNames('w-full text-center mb-0', { 'animate-cancel-shake': isCanceled })}
                  value={amount}
                />
                <AppButton
                  disabled={amount >= quantityAvailable}
                  theme={'transparent'}
                  className="absolute right-0 h-4 w-4 text-base text-accent"
                  onClick={() => setAmount((prev) => prev + 1)}
                  LeftIcon={Plus}
                />
              </div>
              <AppButton
                fullWidth
                theme={'background'}>
                В корзину
              </AppButton>
            </div>
          </div>
          <span className="text-xs text-gray-500 select-none">В наличии: {detail.quantityAvailable}</span>
        </div>
      </div>
      <div className="flex flex-col gap-6 justify-between h-full">
        <section className="flex font-rubik flex-col gap-2 self-start">
          <h2>Описание</h2>
          <p>{description}</p>
        </section>
      </div>
    </div>
  );
};
