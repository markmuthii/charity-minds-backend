import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
import { marked } from "marked";
import connectDB from "./database/connect-database.js";
import { v1Router } from "./routes/v1/index.js";
import { v2Router } from "./routes/v2/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve the API specification markdown
app.get("/docs", async (req, res, next) => {
  const docsPath = path.join(__dirname, "../docs/api-spec.md");
  const baseUrl = process.env.BASE_URL || "http://localhost:3005";
  const nodeEnv = process.env.NODE_ENV || "development";

  try {
    const markdown = (await readFile(docsPath, "utf-8"))
      .replaceAll("{{BASE_URL}}", baseUrl)
      .replaceAll("{{NODE_ENV}}", nodeEnv);
    const html = marked.parse(markdown);

    res.type("text/html").send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Charity Minds API Specification</title>
          <style>
            :root {
              color-scheme: light dark;
              font-family: "Segoe UI", Arial, sans-serif;
            }
            body {
              margin: 0;
              padding: 2rem;
              line-height: 1.6;
              background: #f5f5f5;
              color: #1f2933;
            }
            main {
              max-width: 900px;
              margin: 0 auto;
              background: #fff;
              padding: 2rem;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
            }
            h1, h2, h3, h4 {
              color: #0f172a;
            }
            code, pre {
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
              background: #f0f4f8;
              border-radius: 6px;
            }
            code {
              padding: 0.2em 0.4em;
            }
            pre {
              padding: 1rem;
              overflow-x: auto;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0;
            }
            th, td {
              border: 1px solid #d3dce6;
              padding: 0.6rem;
              text-align: left;
            }
            th {
              background: #edf2fb;
            }
            @media (max-width: 600px) {
              body {
                padding: 1rem;
              }
              main {
                padding: 1.5rem;
              }
            }
          </style>
        </head>
        <body>
          <main>
            ${html}
          </main>
        </body>
      </html>
    `);
  } catch (error) {
    next(error);
  }
});

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
