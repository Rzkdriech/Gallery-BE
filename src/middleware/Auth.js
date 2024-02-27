import { prisma } from "../db/PrismaInstance.js";

export const verifyUser = async (req, res, next) => {
  try {
    console.log(req.session)
    if (!req.session.username) {
      return res.status(401).send('Unauthorized');
    }

    const users = await prisma.user.findMany({
      where: {
        Username: req.session.username,
      },
    });

    if (users.length === 1) {
      req.user = users[0];
      next();
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    res.status(500).send('Internal Server Error');
  }
 
};
