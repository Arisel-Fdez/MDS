import express from "express";
import { addUsersController, listAllUsersController, deleteUserController } from "./dependencies";
//import { authMiddleware } from "../../auth/middlewares/authMiddleware"; 

export const userRouter = express.Router();



// Ruta para agregar un nuevo usuario
userRouter.post(
    "/create",
    addUsersController.run.bind(addUsersController)
);


// Ruta para obtener todos los usuarios
userRouter.get(
    "/",
    listAllUsersController.run.bind(listAllUsersController)
);


// Aplicamos el middleware de autenticación a todas las rutas de `userRouter`
//userRouter.use(authMiddleware);
// Ruta para eliminados usuarios
userRouter.delete(
    "/delete/:id",
    deleteUserController.run.bind(deleteUserController)
);

