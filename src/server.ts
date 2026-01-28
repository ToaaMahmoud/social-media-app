import express from "express";
import dotenv from "dotenv";
import entryPoint from "./app";
import connected from "./DB/connection";

dotenv.config();

const app = express();

const startServer = async () => {
  try {
    await connected();

    entryPoint(app, express);

    const port = process.env.PORT || 3000;
    
    app.listen(port, () => {
      console.log(`Server is running on Port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();