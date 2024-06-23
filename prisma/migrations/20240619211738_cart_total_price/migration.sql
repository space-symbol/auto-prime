/*
  Warnings:

  - You are about to drop the column `discountId` on the `details` table. All the data in the column will be lost.
  - You are about to drop the column `quantityOrdered` on the `details` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `details` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the column `discountEndDate` on the `discounts` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `discounts` table. All the data in the column will be lost.
  - You are about to drop the column `discountStartDate` on the `discounts` table. All the data in the column will be lost.
  - You are about to drop the column `priceAfterDiscount` on the `discounts` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `discounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `discounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "details" DROP CONSTRAINT "details_discountId_fkey";

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "totalPrice" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "discountId" INTEGER;

-- AlterTable
ALTER TABLE "details" DROP COLUMN "discountId",
DROP COLUMN "quantityOrdered",
ADD COLUMN     "discountedPrice" DECIMAL(10,2),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "discounts" DROP COLUMN "discountEndDate",
DROP COLUMN "discountPercentage",
DROP COLUMN "discountStartDate",
DROP COLUMN "priceAfterDiscount",
ADD COLUMN     "endDate" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "percentage" INTEGER NOT NULL,
ADD COLUMN     "startDate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "status" "OrderStatuses" NOT NULL;

-- CreateTable
CREATE TABLE "_DetailToDiscount" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DetailToDiscount_AB_unique" ON "_DetailToDiscount"("A", "B");

-- CreateIndex
CREATE INDEX "_DetailToDiscount_B_index" ON "_DetailToDiscount"("B");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DetailToDiscount" ADD CONSTRAINT "_DetailToDiscount_A_fkey" FOREIGN KEY ("A") REFERENCES "details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DetailToDiscount" ADD CONSTRAINT "_DetailToDiscount_B_fkey" FOREIGN KEY ("B") REFERENCES "discounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
