import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// session
import session from "express-session"

app.use(session({
  name: 'rzk',
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 60000
  }
})
);

app.get("/", (_, res) => {
  res.send("Hello World");
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

app.listen(PORT, console.log(`Server running in ${PORT}`));
