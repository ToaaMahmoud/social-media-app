import { Application } from "express";
import routers from "./routes/routes";
import { globalError } from "./utils/error-handling/global-error";
import { AppError } from "./utils/error-handling/app-error";

const entryPoint = (app: Application, express: any) => {

  // Unexpected errors of app
  process.on("uncaughtException", (err) => {
    console.error(err);
    process.exit(1);
  });

  const baseUrl = "/api/v1";
  app.use(express.json());

  // auth routes
  app.use(`${baseUrl}/auth`, routers.authRouter)
  // User routes
  app.use(`${baseUrl}/users`, routers.userRouter);

  // Posts routes
  app.use(`${baseUrl}/posts`, routers.postRouter);

  //not found handler
  app.use((req, res, next) => {
    next(new AppError("Not Found", 404))
  });

  //global error handling
    app.use(globalError);
    
  // Unhandled errors of the app
  process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
  });
};

export default entryPoint;
