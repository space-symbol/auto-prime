const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { id: 'user_1' },
    update: {},
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
      discountPercentage: null,
      quantityAvailable: 100,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/21/35/23521/images/20571/20571.400x0.jpeg',
    },
    create: {
      id: 1,
      name: 'Тормозные колодки Brembo',
      description: 'Качественные тормозные колодки от Brembo для надежного торможения',
      price: 59.99,
      discountPercentage: null,
      quantityAvailable: 100,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/21/35/23521/images/20571/20571.400x0.jpeg',
    },
  });

  const detail2 = await prisma.detail.upsert({
    where: { id: 2 },
    update: {
      id: 2,
      name: 'Фильтр масляный Mann',
      description: 'Оригинальный фильтр масляный Mann для эффективной фильтрации масла в двигателе',
      price: 12.99,
      discountPercentage: 5,
      quantityAvailable: 200,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/98/36/23698/images/22183/22183.400x0.jpeg',
    },
    create: {
      id: 2,
      name: 'Фильтр масляный Mann',
      description: 'Оригинальный фильтр масляный Mann для эффективной фильтрации масла в двигателе',
      price: 12.99,
      discountPercentage: 5,
      quantityAvailable: 200,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/98/36/23698/images/22183/22183.400x0.jpeg',
    },
  });

  const detail3 = await prisma.detail.upsert({
    where: { id: 3 },
    update: {
      id: 3,
      name: 'Аккумулятор Bosch S5',
      description: 'Надежный аккумулятор Bosch S5 для старта двигателя в любых условиях',
      price: 129.99,
      discountPercentage: null,
      quantityAvailable: 50,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/50/20/22050/images/18570/18570.400x0.jpg',
    },
    create: {
      id: 3,
      name: 'Аккумулятор Bosch S5',
      description: 'Надежный аккумулятор Bosch S5 для старта двигателя в любых условиях',
      price: 129.99,
      discountPercentage: null,
      quantityAvailable: 50,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/50/20/22050/images/18570/18570.400x0.jpg',
    },
  });

  const detail4 = await prisma.detail.upsert({
    where: { id: 4 },
    update: {
      id: 4,
      name: 'Шины Michelin Pilot Sport 4',
      description: 'Высокопроизводительные шины Michelin Pilot Sport 4 для спортивного вождения',
      price: 199.99,
      discountPercentage: 10,
      quantityAvailable: 30,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/55/29/22955/images/19715/19715.400x0.jpg',
    },
    create: {
      id: 4,
      name: 'Шины Michelin Pilot Sport 4',
      description: 'Высокопроизводительные шины Michelin Pilot Sport 4 для спортивного вождения',
      price: 199.99,
      discountPercentage: 10,
      quantityAvailable: 30,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/55/29/22955/images/19715/19715.400x0.jpg',
    },
  });

  const detail5 = await prisma.detail.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      name: 'LEVEL Performance Впускной коллектор двигателя BMW M5 F90 S63, Billet ',
      description: 'Высокопроизводительные шины Michelin Pilot Sport 4 для спортивного вождения',
      price: 100.99,
      discountPercentage: 10,
      quantityAvailable: 30,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/55/29/22955/images/19715/19715.400x0.jpg',
    },
  });

  const detail6 = await prisma.detail.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      name: 'ST Suspension Подвеска (койловеры) ST X Подвеска (койловеры) ST XA BMW 1er F20 / F 21 / 3er F30 / 4e ',
      description: 'Комплект винтовой подвески (койловеров) ST Suspension ST X с регулировкой по высоте',
      price: 100.99,
      discountPercentage: 10,
      quantityAvailable: 30,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg',
    },
  });

  const detail7 = await prisma.detail.upsert({
    where: { id: 7 },
    update: {},
    create: {
      id: 7,
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
      quantityAvailable: 30,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg',
    },
  });

  const detail8 = await prisma.detail.upsert({
    where: { id: 8 },
    update: {},
    create: {
      id: 8,
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
      quantityAvailable: 30,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg',
    },
  });
  const detail9 = await prisma.detail.upsert({
    where: { id: 9 },
    update: {},
    create: {
      id: 9,
      name: 'GSC Power-Division Распредвалы R2 Toyota 2JZ-GTE VVTi, 278°/278°, комплект  ',
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
      quantityAvailable: 30,
      imageUrl: 'https://1evel.ru/wa-data/public/shop/products/45/52/25245/images/22872/22872.400x0.jpeg',
    },
  });

  const order1 = await prisma.order.upsert({
    where: { id: 'order_1' },
    update: {},
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
