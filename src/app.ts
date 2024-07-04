import express from 'express';
import { Signale } from 'signale';
import dotenv from 'dotenv';
import { initializeDatabase } from './database/sequelize';
import { initializeDatabasemongo } from './database/mongo';
import { userRouter } from './user/infraestructure/userRouter';
import { authRouter } from './auth/infraestructure/authRouter';
import { userPublicationRouter } from './publication/infraestructure/userPublicationRouter';
import { likeRouter } from './reaction/infraestructure/likeRouter';

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const signale = new Signale();

// Middleware para parsear JSON
app.use(express.json());

// Configurar rutas
app.use('/user', userRouter);
app.use('/login', authRouter);
app.use('/publication', userPublicationRouter);
app.use('/reaction', likeRouter);

async function startServer() {
    try {
        // Inicializar y conectar a la base de datos SQL
        await initializeDatabase();
        // Inicializar y conectar a la base de datos MongoDB
        await initializeDatabasemongo();

        // Iniciar el servidor Express
        app.listen(process.env.PORT || 3000, () => {
            signale.success(`Server online on port ${process.env.PORT || 80}`);
        });
    } catch (error) {
        signale.error("Error starting the server:", error);
    }
}

// Iniciar la aplicación
startServer();
export {app};
