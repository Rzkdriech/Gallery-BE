import PrismaInstance from "../db/PrismaInstance.js";

export const getPhotos = async (_, res) => {
  try {
    const response = await PrismaInstance.prisma.foto.findMany({
      include: {
        Album: true,
        User: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPhoto = async (req, res) => {
  const newFoto = req.body;

  const checkFoto = await PrismaInstance.prisma.foto.findMany({
    where: {
      JudulFoto: newFoto.JudulFoto,
      UserID: newFoto.UserID,
    },
  });

  if (checkFoto.length > 0) return res.status(400).json({ msg: "data exists" });

  try {
    const cFoto = await PrismaInstance.prisma.foto.create({
      data: {
        JudulFoto: newFoto.JudulFoto,
        DeskripsiFoto: newFoto.DeskripsiFoto,
        TanggalUnggah: newFoto.TanggalUnggah,
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
