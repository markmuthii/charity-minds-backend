import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connect-database.js";
import { v1Router } from "./routes/v1/index.js";
import { v2Router } from "./routes/v2/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.configDotenv();

connectDB();

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

// const midd = (req, res, next) => {
//   const cookieString = req.headers.cookie;

//   const cookieArr = cookieString.split("; ");

//   console.log(cookieArr);

//   const cookieObj = {};

//   cookieArr.forEach((cookie) => {
//     const [cookieName, cookieValue] = cookie.split("=");

//     cookieObj[cookieName] = cookieValue;

//     // cookies.push(cookieObj);
//   });

//   console.log({ cookiesInMiddleware: cookieObj });

//   req.cookies = cookieObj;

//   next();
// };

app.use(cookieParser());
app.use(express.json());

// app.use(midd);

// ROUTES
app.get("/", (req, res) => {
  console.log({ CookiesInHome: req.cookies });

  console.log("Request received on root path");
  res.json({
    message: "Silence is golden",
  });
});

app.use("/api/v1", v1Router);

app.use("/api/v2", v2Router);
// END ROUTES

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
