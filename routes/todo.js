import express from "express"
import prisma from "../db/index.js"

export default function todoRouter(){
    const router = express.Router();

//GET | Get all route data
router.get("/", async (request, response) => {
    console.log(request.user);

    const todos = await prisma.todo.findMany({
        where: {
            userId: request.user.id,
        }
    });

    response.status(200).json({
        success: true,
        message: "Router root / is working"
    });
});

//POST | Create new user
router.post("/todo", async (request, response) => {
    console.log(request.user);

    const todos = await prisma.todo.create({
        where: {
            userId: request.user.id,
        }
    });
    
    response.status(201).json({
        success: true,
        message: "New user has be registered"
    });
});

return router;
}