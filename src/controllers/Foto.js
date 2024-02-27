import { prisma } from "../db/PrismaInstance.js";

export const getPhotos = async (_, res) => {
  try {
    const response = await prisma.foto.findMany({
      include: {
        komentarfoto: true,
        likefoto: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPhoto = async (req, res) => {
  const newFoto = req.body;

  const checkFoto = await prisma.foto.findMany({
    where: {
      JudulFoto: newFoto.JudulFoto,
      UserID: newFoto.UserID,
    },
  });

  if (checkFoto.length > 0) return res.status(400).json({ msg: "data exists" });

  try {
    const currentDate = new Date()
    const cFoto = await prisma.foto.create({
      data: {
        JudulFoto: newFoto.JudulFoto,
        DeskripsiFoto: newFoto.DeskripsiFoto,
        TanggalUnggah: currentDate,
        LokasiFile: newFoto.LokasiFile,
        AlbumID: newFoto.AlbumID,
        UserID: newFoto.UserID,
      },
    });
    res.status(201).json({ msg: "data created", data: cFoto });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
