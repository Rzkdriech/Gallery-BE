import PrismaInstance from "../db/PrismaInstance.js";

export const getUsers = async (_, res) => {
  try {
    const response = await PrismaInstance.prisma.user.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { Password, ConfPass } = req.body;
  const newUser = req.body;

  // Password
  if (Password != ConfPass)
    return res.status(400).json({ msg: "Pastikan password anda benar" });

  const checkUser = await PrismaInstance.prisma.user.findMany({
    where: {
      Email: newUser.Email,
    },
  });

  if (checkUser.length > 0) return res.status(400).json({ msg: "User exist" });

  try {
    const user = await PrismaInstance.prisma.user.create({
      data: {
        Username: newUser.Username,
        Password: Password,
        Email: newUser.Email,
        NamaLengkap: newUser.NamaLengkap,
        Alamat: newUser.Alamat,
      },
    });
    res.status(201).json({ msg: "data created", data: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const paramsId = req.params.id;

  try {
    const delUser = await PrismaInstance.prisma.user.delete({
      where: {
        Email: paramsId,
      },
    });
    res.status(200).json({ msg: "data deleted", delUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const paramsId = req.params.id;
  const upUserData = req.body;

  try {
    const upUser = await PrismaInstance.prisma.user.update({
      where: {
        Email: paramsId,
      },

      data: {
        Username: upUserData.Username,
        Password: upUserData.Password,
        NamaLengkap: upUserData.NamaLengkap,
        Alamat: upUserData.Alamat,
      },
    });

    res.status(201).json({ msg: "data updated", data: upUser })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
};
