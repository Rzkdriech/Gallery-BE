import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// jwt
import cookieParser from "cookie-parser";
app.use(cookieParser());

//session
import session from "express-session";
import { MemoryStore } from "express-session";
import { prisma } from "./src/db/PrismaInstance.js";

app.use(
  session({
    cookie: {
      maxAge: 900000,
      secure: false,
      sameSite: true
    },
    secret: 'halogays',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore
    }),
);
const auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

// app.get('/login', function (req, res) {
//   if (!req.query.username || !req.query.password) {
//     res.send('login failed');    
//   } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
//     req.session.user = "amy";
//     req.session.admin = true;
//     res.send("login success!");
//   }
// });


// test auth
// const checkAuth = async (req, res, next) => {
//   try {
//     console.log(req.session)
//     if (!req.session.username) {
//       return res.status(401).send('Unauthorized');
//     }
//
//     const users = await prisma.user.findMany({
//       where: {
//         Username: req.session.username,
//       },
//     });
//
//     if (users.length === 1) {
//       req.user = users[0];
//       next();
//     } else {
//       return res.status(401).send('Unauthorized');
//     }
//   } catch (error) {
//     console.error('Error checking authentication:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//
//     const user = await prisma.user.findMany({
//       where: {
//         Username: username,
//         Password: password
//       },
//     });
//
//     if (user.length === 1) {
//       req.session.username = user[0].Username;  // Simpan username di sessionn
//       console.log(req.session.username)
//       res.send("logged in");
//     } else {
//       res.status(401).send('Authentication failed');
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

import { verifyUser } from "./src/middleware/Auth.js";

app.get("/", verifyUser,(req, res) => {
  console.log(req.user)
  res.send(`halo ${req.session.username}`)
});

// Router
import authRoute from "./src/router/Auth.js";
import userRoute from "./src/router/UserRoute.js";
import fotoRoute from "./src/router/FotoRoute.js";
import albumRoute from "./src/router/AlbumRoute.js";
import komentarRoute from "./src/router/KomentarFotoRoute.js";
import likeRoute from "./src/router/LikeRoute.js";


const routes = [
  authRoute,
  userRoute,
  fotoRoute,
  albumRoute,
  komentarRoute,
  likeRoute,
];

routes.forEach((route) => {
  app.use(route);
});

/* const ipAddress = "192.168.1.67"; */
app.listen(PORT, console.log(`Server running in ${PORT}`));
