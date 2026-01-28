import { Application } from "express";
import routers from "./routes/routes";
import { globalError } from "./utils/error-handling/global-error";

const entryPoint = (app: Application, express: any) => {

  // Unexpected errors of app
  process.on("uncaughtException", (err) => {
    console.error(err);
    process.exit(1);
  });

  const baseUrl = "/api/v1";
  app.use(express.json());

  // User routes
  app.use(`${baseUrl}/users`, routers.userRouter);

  // Posts routes
  app.use(`${baseUrl}/posts`, routers.postRouter);

  //not found handler
  app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });

  //global error handling
    app.use(globalError);
  });
  
  // Unhandled errors of the app
  process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
  });
};

export default entryPoint;
