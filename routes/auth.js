import express from "express";

export default function createAuthRouter(passport){
  const router = express.Router();

  router.post(
    "/login",
    //Need some type of middleware to handle the login
    passport.authenticate("local"),
    (request, response) => {
      response.status(200).json({
        success: "true",
      });
    }
  );
  
  return router;
}
