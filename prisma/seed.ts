const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { id: 'user_1' },
    update: {
      name: 'John Doe',
      email: 'john1@example.com',
      emailVerified: new Date(),
      role: 'USER',
    },
    create: {
      id: 'user_1',
      name: 'John Doe',
      email: 'john1@example.com',
      emailVerified: new Date(),
      role: 'USER',
    },
  });
  const detail1 = await prisma.detail.upsert({
    where: { id: 1 },
    update: {
      name: 'Тормозные колодки Brembo',
      description: 'Качественные тормозные колодки от Brembo для надежного торможения',
      price: 59.99,
      discountPercentage: 0,
      quantityAvailable: 100,
      images: ['https://1evel.ru/wa-data/public/shop/products/47/10/21047/images/17186/17186.1920.jpg'],
    },
    create: {
      name: 'Тормозные колодки Brembo',
      description: 'Качественные тормозные колодки от Brembo для надежного торможения',
      price: 59.99,
      discountPercentage: 0,
      quantityAvailable: 100,
      images: ['https://images.wallpaperscraft.ru/image/single/georgina_tsvetok_lepestki_1224100_1920x1080.jpg'],
    },
  });

  const detail2 = await prisma.detail.upsert({
    where: { id: 2 },
    update: {
      name: 'Фильтр масляный Mann',
      description: 'Оригинальный фильтр масляный Mann для эффективной фильтрации масла в двигателе',
      price: 12.99,
      discountPercentage: 5,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 18),
      quantityAvailable: 200,
      images: ['https://1evel.ru/wa-data/public/shop/products/98/36/23698/images/22183/22183.400x0.jpeg'],
    },
    create: {
      name: 'Фильтр масляный Mann',
      description: 'Оригинальный фильтр масляный Mann для эффективной фильтрации масла в двигателе',
      price: 12.99,
      discountPercentage: 5,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 18),
      quantityAvailable: 200,
      images: ['https://1evel.ru/wa-data/public/shop/products/98/36/23698/images/22183/22183.400x0.jpeg'],
    },
  });

  const detail3 = await prisma.detail.upsert({
    where: { id: 3 },
    update: {
      name: 'Аккумулятор Bosch S5',
      description: 'Надежный аккумулятор Bosch S5 для старта двигателя в любых условиях',
      price: 129.99,
      discountPercentage: 0,
      quantityAvailable: 50,
      images: ['https://1evel.ru/wa-data/public/shop/products/50/20/22050/images/18570/18570.400x0.jpg'],
    },
    create: {
      name: 'Аккумулятор Bosch S5',
      description: 'Надежный аккумулятор Bosch S5 для старта двигателя в любых условиях',
      price: 129.99,
      discountPercentage: 0,
      quantityAvailable: 50,
      images: ['https://1evel.ru/wa-data/public/shop/products/50/20/22050/images/18570/18570.400x0.jpg'],
    },
  });

  const detail4 = await prisma.detail.upsert({
    where: { id: 4 },
    update: {
      name: 'Шины Michelin Pilot Sport 4',
      description: 'Высокопроизводительные шины Michelin Pilot Sport 4 для спортивного вождения',
      price: 199.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 1),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/55/29/22955/images/19715/19715.400x0.jpg'],
    },
    create: {
      name: 'Шины Michelin Pilot Sport 4',
      description: 'Высокопроизводительные шины Michelin Pilot Sport 4 для спортивного вождения',
      price: 199.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 1),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/55/29/22955/images/19715/19715.400x0.jpg'],
    },
  });

  const detail5 = await prisma.detail.upsert({
    where: { id: 5 },
    update: {
      name: 'LEVEL Performance Впускной коллектор двигателя BMW M5 F90 S63, Billet ',
      description: 'Высокопроизводительные шины Michelin Pilot Sport 4 для спортивного вождения',
      price: 100.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 2),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/55/29/22955/images/19715/19715.400x0.jpg'],
    },
    create: {
      name: 'LEVEL Performance Впускной коллектор двигателя BMW M5 F90 S63, Billet ',
      description: 'Высокопроизводительные шины Michelin Pilot Sport 4 для спортивного вождения',
      price: 100.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 2),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/55/29/22955/images/19715/19715.400x0.jpg'],
    },
  });

  const detail6 = await prisma.detail.upsert({
    where: { id: 6 },
    update: {
      name: 'ST Suspension Подвеска (койловеры) ST X Подвеска (койловеры) ST XA BMW 1er F20 / F 21 / 3er F30 / 4e ',
      description: 'Комплект винтовой подвески (койловеров) ST Suspension ST X с регулировкой по высоте',
      price: 100.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 7),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg'],
    },
    create: {
      name: 'ST Suspension Подвеска (койловеры) ST X Подвеска (койловеры) ST XA BMW 1er F20 / F 21 / 3er F30 / 4e ',
      description: 'Комплект винтовой подвески (койловеров) ST Suspension ST X с регулировкой по высоте',
      price: 100.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 7),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg'],
    },
  });

  const detail7 = await prisma.detail.upsert({
    where: { id: 7 },
    update: {
      name: 'LINK Блок управления G4X XtremeX',
      description: `Входы:

      8/10* цифровых входов
      *При использовании второй CAN-шины требуется 2 входа
      4 температурных входа
      11 аналоговых входов
      2 триггерных входа
      2 х Knock-входа
      
      Выходы:
      
      8 форсунок
      8 катушек зажигания
      10 дополнительных выходов*
      +5В питание датчика
      +8В питание датчика`,
      price: 100.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 30),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg'],
    },
    create: {
      name: 'LINK Блок управления G4X XtremeX',
      description: `Входы:

      8/10* цифровых входов
      *При использовании второй CAN-шины требуется 2 входа
      4 температурных входа
      11 аналоговых входов
      2 триггерных входа
      2 х Knock-входа
      
      Выходы:
      
      8 форсунок
      8 катушек зажигания
      10 дополнительных выходов*
      +5В питание датчика
      +8В питание датчика`,
      price: 100.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 30),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg'],
    },
  });

  const detail8 = await prisma.detail.upsert({
    where: { id: 8 },
    update: {
      name: 'Garrett Турбина G35-900 Standard Rotation (без горячей части) ',
      description: `Входы:

      8/10* цифровых входов
      *При использовании второй CAN-шины требуется 2 входа
      4 температурных входа
      11 аналоговых входов
      2 триггерных входа
      2 х Knock-входа
      
      Выходы:
      
      8 форсунок
      8 катушек зажигания
      10 дополнительных выходов*
      +5В питание датчика
      +8В питание датчика`,
      price: 100.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 20),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg'],
    },
    create: {
      name: 'Garrett Турбина G35-900 Standard Rotation (без горячей части) ',
      description: `Входы:

      8/10* цифровых входов
      *При использовании второй CAN-шины требуется 2 входа
      4 температурных входа
      11 аналоговых входов
      2 триггерных входа
      2 х Knock-входа
      
      Выходы:
      
      8 форсунок
      8 катушек зажигания
      10 дополнительных выходов*
      +5В питание датчика
      +8В питание датчика`,
      price: 100.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 20),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg'],
    },
  });
  const detail9 = await prisma.detail.upsert({
    where: { id: 9 },
    update: {
      name: 'EVENTURI Система впуска RS Q8 / Cayenne Turbo / Urus / Bentayga',
      description: `Входы:

      8/10* цифровых входов
      *При использовании второй CAN-шины требуется 2 входа
      4 температурных входа
      11 аналоговых входов
      2 триггерных входа
      2 х Knock-входа
      
      Выходы:
      
      8 форсунок
      8 катушек зажигания
      10 дополнительных выходов*
      +5В питание датчика
      +8В питание датчика`,
      price: 100.99,
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg'],
    },
    create: {
      name: 'EVENTURI Система впуска RS Q8 / Cayenne Turbo / Urus / Bentayga',
      description: `Входы:

      8/10* цифровых входов
      *При использовании второй CAN-шины требуется 2 входа
      4 температурных входа
      11 аналоговых входов
      2 триггерных входа
      2 х Knock-входа
      
      Выходы:
      
      8 форсунок
      8 катушек зажигания
      10 дополнительных выходов*
      +5В питание датчика
      +8В питание датчика`,
      price: 100.99,
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg'],
    },
  });

  const detail10 = await prisma.detail.upsert({
    where: { id: 10 },
    update: {
      name: 'GSC Power-Division Распредвалы R2 Toyota 2JZ-GTE VVTi, 278°/278°, комплект',
      description: `Предназначен для установки на автомобили:

      - Audi 4MN RSQ8 / SQ8 / 4M SQ7 2020+
      - Lamborghini Urus 2019+.
      - Porsche Cayenne Turbo 2020+
      - Bentley Bentayga 2019+
      `,
      price: 100.99,
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/52/46/24652/images/22230/22230.1920.jpg'],
    },
    create: {
      name: 'GSC Power-Division Распредвалы R2 Toyota 2JZ-GTE VVTi, 278°/278°, комплект',
      description: `Предназначен для установки на автомобили:

      - Audi 4MN RSQ8 / SQ8 / 4M SQ7 2020+
      - Lamborghini Urus 2019+.
      - Porsche Cayenne Turbo 2020+
      - Bentley Bentayga 2019+
      `,
      price: 100.99,
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/52/46/24652/images/22230/22230.1920.jpg'],
    },
  });
  const detail11 = await prisma.detail.upsert({
    where: { id: 11 },
    update: {
      name: 'Интеркулер универсальный, 635мм*305мм*89мм (Вход / выход 76мм) ',
      description: `Предназначен для установки на автомобили:

      - Audi 4MN RSQ8 / SQ8 / 4M SQ7 2020+
      - Lamborghini Urus 2019+.
      - Porsche Cayenne Turbo 2020+
      - Bentley Bentayga 2019+
      `,
      price: 100.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 14),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/63/31/23163/images/20046/20046.1920.jpeg'],
    },
    create: {
      name: 'Интеркулер универсальный, 635мм*305мм*89мм (Вход / выход 76мм) ',
      description: `Предназначен для установки на автомобили:

      - Audi 4MN RSQ8 / SQ8 / 4M SQ7 2020+
      - Lamborghini Urus 2019+.
      - Porsche Cayenne Turbo 2020+
      - Bentley Bentayga 2019+
      `,
      price: 100.99,
      discountPercentage: 10,
      discountEndDate: new Date(Date.now() + 60 * 60 * 24 * 14),
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/63/31/23163/images/20046/20046.1920.jpeg'],
    },
  });
  const detail12 = await prisma.detail.upsert({
    where: { id: 12 },
    update: {
      name: 'akldhaksjhd',
      description: `15100-46052
      Насос масляный 2JZ-GTE, так же подходит на 1JZ
      `,
      price: 100.99,
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/98/50/25098/images/22694/22694.1920.jpeg'],
    },
    create: {
      name: 'akldhaksjhd',
      description: `15100-46052
      Насос масляный 2JZ-GTE, так же подходит на 1JZ
      `,
      price: 100.99,
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/98/50/25098/images/22694/22694.1920.jpeg'],
    },
  });
  const detail13 = await prisma.detail.upsert({
    where: { id: 12 },
    update: {
      name: 'Белеберда',
      description: `15100-46052
      Насос масляный 2JZ-GTE, так же подходит на 1JZ
      `,
      price: 100.99,
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/98/50/25098/images/22694/22694.1920.jpeg'],
    },
    create: {
      name: 'Белеберда',
      description: `15100-46052
      Насос масляный 2JZ-GTE, так же подходит на 1JZ
      `,
      price: 100.99,
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/98/50/25098/images/22694/22694.1920.jpeg'],
    },
  });

  const detail14 = await prisma.detail.upsert({
    where: { id: 12 },
    update: {
      name: 'Белеберда 2',
      description: `15100-46052
      Насос масляный 2JZ-GTE, так же подходит на 1JZ
      `,
      price: 100.99,
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/98/50/25098/images/22694/22694.1920.jpeg'],
    },
    create: {
      name: 'Белеберда 2',
      description: `15100-46052
      Насос масляный 2JZ-GTE, так же подходит на 1JZ
      `,
      price: 100.99,
      quantityAvailable: 30,
      images: ['https://1evel.ru/wa-data/public/shop/products/98/50/25098/images/22694/22694.1920.jpeg'],
    },
  });

  const order1 = await prisma.order.upsert({
    where: { id: 'order_1' },
    update: {
      id: 'order_1',
      orderDate: new Date(),
      totalAmount: 44.97,
      userId: user1.id,
    },
    create: {
      id: 'order_1',
      orderDate: new Date(),
      totalAmount: 44.97,
      userId: user1.id,
    },
  });

  const orderDetails = await prisma.orderDetail.createMany({
    data: [
      {
        quantity: 1,
        unitPrice: 19.99,
        orderId: order1.id,
        detailId: detail1.id,
      },
      {
        quantity: 1,
        unitPrice: 14.99,
        orderId: order1.id,
        detailId: detail2.id,
      },
      {
        quantity: 2,
        unitPrice: 9.99,
        orderId: order1.id,
        detailId: detail3.id,
      },
    ],
  });

  const payment1 = await prisma.payment.upsert({
    where: { orderId: 'order_1' },
    update: {},
    create: {
      paymentDate: new Date(),
      paymentMethod: 'Credit Card',
      amount: 44.97,
      orderId: order1.id,
    },
  });

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
