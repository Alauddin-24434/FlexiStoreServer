-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "flashSaleDiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "flashSaleEndTime" TIMESTAMP(3),
ADD COLUMN     "flashSaleIsActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "flashSaleStartTime" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Product_flashSaleIsActive_idx" ON "Product"("flashSaleIsActive");
