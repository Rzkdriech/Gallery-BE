import PrismaInstance from "../db/PrismaInstance.js";

export const getComments = async (_, res) => {
  try {
    const response = await PrismaInstance.prisma.komentarfoto.findMany({
      include: {
        Foto: true,
        User: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createComment = async (req, res) => {
  const newComment = req.body;

  const checkExist = await PrismaInstance.prisma.komentarfoto.findMany({
    where: {
      TanggalKomentar: newComment.TanggalKomentar,
    },
  });

  if (checkExist.length > 0)
    return res.status(400).json({ msg: "data exist!!" });
  try {
    const cComment = await PrismaInstance.prisma.komentarfoto.create({
      data: {
        FotoID: newComment.FotoID,
        UserID: newComment.UserID,
        IsiKomentar: newComment.IsiKomentar,
        TanggalKomentar: newComment.TanggalKomentar,
      },
    });
    res.status(201).json({ msg: "data created", data: cComment });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
