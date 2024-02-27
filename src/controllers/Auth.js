import { prisma } from "../db/PrismaInstance.js"


export const Login = async(req, res) => {
try {
    const { username, password } = req.body;

    const user = await prisma.user.findMany({
      where: {
        Username: username,
        Password: password
      },
    });

    if (user.length === 1) {
      req.session.username = user[0].Username;  // Simpan username di sessionn
      console.log(req.session.username)
      res.send("logged in");
    } else {
      res.status(401).send('Authentication failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }

}

export const Me = async(req, res) => {
  if (!req.session.username) {
    return res.status(404).json({ msg: "Mohon login"})
  }

  const user = await prisma.user.findMany({
    where: {
      Username: req.session.username
    }
  })

  if (user.length == 0) return res.status(404).json({ msg: "failed" })
  res.status(200).json({user})

}
