import dotenv from 'dotenv';
import { Sequelize, } from 'sequelize-typescript';
import UserModel from '../user/infraestructure/models/userModel';
import UserPublicationModel from '../publication/infraestructure/models/userPublicationModel';
import LikeModel from '../reaction/infraestructure/models/likeModel';
import { Dialect } from 'sequelize';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Verificar que todas las variables de entorno necesarias estén definidas
const dialect = process.env.DB_DIALECT as Dialect;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

if (!dialect || !host || !port || !database || !username || !password) {
    throw new Error('One or more environment variables are missing.');
}

// Crear la instancia de Sequelize utilizando las variables de entorno
export const sequelize = new Sequelize({
    dialect,
    host,
    port: parseInt(port, 10),
    database,
    username,
    password,
    models: [UserModel, UserPublicationModel, LikeModel],
});

export async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');
        await sequelize.sync({ force: false });
    } catch (err) {
        console.error('No se pudo conectar a la base de datos:', err);
        process.exit(1);  // Cierra la aplicación si hay un error de conexión
    }
}
