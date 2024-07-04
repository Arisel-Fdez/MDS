import express from "express";
import { 
    userPublicationController, 
    viewPublicationsController, 
    deletePublicationController, 
} from "./dependencies";
//import { authMiddleware } from "../../auth/middlewares/authMiddleware"; 

export const userPublicationRouter = express.Router();


// Middleware de autenticación
//userPublicationRouter.use(authMiddleware);

// Ruta para agregar una nueva publicación
userPublicationRouter.post(
    "/publish", 
    userPublicationController.run.bind(userPublicationController)
);

// Ruta para ver todas las publicaciones
userPublicationRouter.get(
    "/", 
    viewPublicationsController.run.bind(viewPublicationsController)
);

// Ruta para eliminar una publicación específica por su ID
userPublicationRouter.delete(
    "/publication/:id", 
    deletePublicationController.run.bind(deletePublicationController)
);