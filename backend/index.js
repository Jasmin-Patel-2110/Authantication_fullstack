import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.utils.js";
import cookieParser from "cookie-parser";

// import all routes
import userRoutes from "./routes/user.route.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// app.use() is used to use middleware

/*
  CORS - Cross-Origin Resource Sharing

  Cross-origin resource sharing (CORS) is a mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
*/
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"], // methods ki permission
    allowedHeaders: ["Content-Type", "Authorization"], // headers ki permission
    credentials: true, // Agar cookies ya authentication headers use ho tab
  })
);
app.use(express.json()); // body parser is used to read json from request object
app.use(cookieParser()); // cookie parser is used to read cookies from request object

app.get("/", (req, res) => {
  res.send("hello world");
});

//connect to DB
connectDB(); // call here because all below routes need DataBase connection

app.use("/api/v1/user", userRoutes); // all routes starting with /api/v1/user will be handled by userRoutes Router

app.listen(port, () => {
  console.log(`App listening to port ${port}.`);
});
