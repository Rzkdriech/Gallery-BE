-- CreateTable
CREATE TABLE `album` (
    `AlbumID` INTEGER NOT NULL AUTO_INCREMENT,
    `NamaAlbum` VARCHAR(191) NOT NULL,
    `Deskripsi` VARCHAR(191) NOT NULL,
    `TanggalDibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UserID` INTEGER NOT NULL,

    PRIMARY KEY (`AlbumID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foto` (
    `FotoID` INTEGER NOT NULL AUTO_INCREMENT,
    `JudulFoto` VARCHAR(191) NOT NULL,
    `DeskripsiFoto` VARCHAR(191) NOT NULL,
    `TanggalUnggah` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `LokasiFile` VARCHAR(191) NOT NULL,
    `AlbumID` INTEGER NOT NULL,
    `UserID` INTEGER NOT NULL,

    PRIMARY KEY (`FotoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `komentarfoto` (
    `KomentarID` INTEGER NOT NULL AUTO_INCREMENT,
    `FotoID` INTEGER NOT NULL,
    `UserID` INTEGER NOT NULL,
    `IsiKomentar` VARCHAR(191) NOT NULL,
    `TanggalKomentar` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`KomentarID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likefoto` (
    `LikeID` INTEGER NOT NULL AUTO_INCREMENT,
    `FotoID` INTEGER NOT NULL,
    `UserID` INTEGER NOT NULL,
    `TanggalLike` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`LikeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `NamaLengkap` VARCHAR(191) NOT NULL,
    `Alamat` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_Email_key`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `album` ADD CONSTRAINT `album_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `foto` ADD CONSTRAINT `foto_AlbumID_fkey` FOREIGN KEY (`AlbumID`) REFERENCES `album`(`AlbumID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `foto` ADD CONSTRAINT `foto_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentarfoto` ADD CONSTRAINT `komentarfoto_FotoID_fkey` FOREIGN KEY (`FotoID`) REFERENCES `foto`(`FotoID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentarfoto` ADD CONSTRAINT `komentarfoto_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likefoto` ADD CONSTRAINT `likefoto_FotoID_fkey` FOREIGN KEY (`FotoID`) REFERENCES `foto`(`FotoID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likefoto` ADD CONSTRAINT `likefoto_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
