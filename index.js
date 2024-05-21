import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
//Tambahkan
// import db from "./config/Database.js";
//Tambahkan
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

//panggil funtionnya
dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

//Tambahkan setelah import db
// (async () => {
//   await db.sync();
// })();

//definisiakan session
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto", //ses otomatis
    },
  })
);

//Buat midleware
app.use(
  cors({
    credentials: true, //berfungsi agar front end dapat mengirimkan request yg credientials
    origin: "http://localhost:3000", // ini adalah domain yg kita izinkan agar dapat mengakses API kita
  })
);

//Midlelware
app.use(express.json()); // supaya bisa menerima data dalam bentuk json

// Tambahkan gunakan sebagai middleware
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync(); => perintah create table session di database

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
