import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import setupLocalStrategy from "./auth/index.js";
import authRouter from "./routes/auth.js";
import createAuthRouter from "./routes/auth.js";
import todo from "./routes/todo.js"
import todoRouter from "./routes/todo.js";

export default function createServer() {
  const app = express();

  app.use(express.json());

  //Add sessions here
  app.use(session({
    secret: "thisIsASecretSessionKey",
    resave: false,
    saveUninitialized: false
  }))

  app.use(cookieParser());

  setupLocalStrategy(passport);

  //Add passport session middleware
  app.use(passport.authenticate("session"));

  const authRouter = createAuthRouter(passport);

  app.use("/auth", authRouter);

  //Need to make some type of middleware to see if the user is logged in.
  //add the middleware to the route below

function checkIfUserIsLoggedIn(request, response, next) {
  console.log(request.user);
  console.log(request.session);

  if(!request.user) {
    response.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  } else {
    next();
  }
}

//Todo Router

app.use("/todo", todoRouter);


  app.get("/protected", function (request, response) {
    response.status(200).json({
      success: true,
      message: "You should be good",
    });
  });

  return app;
}
