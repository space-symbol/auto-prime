/*
  Warnings:

  - You are about to drop the column `detail_id` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `discountEndDate` on the `details` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `details` table. All the data in the column will be lost.
  - You are about to drop the column `promotionId` on the `details` table. All the data in the column will be lost.
  - You are about to drop the column `cart_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `promotions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cartId,detailId]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `detailId` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "details" DROP CONSTRAINT "details_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_cart_id_fkey";

-- DropIndex
DROP INDEX "cart_items_cartId_detail_id_key";

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "detail_id",
ADD COLUMN     "detailId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "details" DROP COLUMN "discountEndDate",
DROP COLUMN "discountPercentage",
DROP COLUMN "promotionId",
ADD COLUMN     "discountId" INTEGER;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "cart_id",
ADD COLUMN     "cartId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "promotions";

-- CreateTable
CREATE TABLE "discounts" (
    "id" SERIAL NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceAfterDiscount" DOUBLE PRECISION NOT NULL,
    "discountStartDate" TIMESTAMPTZ(3),
    "discountEndDate" TIMESTAMPTZ(3),

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cartId_detailId_key" ON "cart_items"("cartId", "detailId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
