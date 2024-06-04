/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Detail` table. All the data in the column will be lost.
  - Made the column `discountPercentage` on table `Detail` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OrderStatuses" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "imageUrl",
ADD COLUMN     "discountEndDate" TIMESTAMP(3),
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "quantityOrdered" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "discountPercentage" SET NOT NULL,
ALTER COLUMN "discountPercentage" SET DEFAULT 0,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cartId" INTEGER;

-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "status" "OrderStatuses" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "detailId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_detailId_userId_key" ON "Cart"("detailId", "userId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
