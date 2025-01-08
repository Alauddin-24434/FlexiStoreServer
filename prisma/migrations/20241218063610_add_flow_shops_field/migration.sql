-- CreateTable
CREATE TABLE "_UserFollowedShops" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFollowedShops_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserFollowedShops_B_index" ON "_UserFollowedShops"("B");

-- AddForeignKey
ALTER TABLE "_UserFollowedShops" ADD CONSTRAINT "_UserFollowedShops_A_fkey" FOREIGN KEY ("A") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowedShops" ADD CONSTRAINT "_UserFollowedShops_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
