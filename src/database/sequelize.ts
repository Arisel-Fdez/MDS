import { Sequelize } from 'sequelize-typescript';

import UserModel from '../user/infraestructure/models/userModel';
import UserPublicationModel from '../publication/infraestructure/models/userPublicationModel';
import LikeModel from '../reaction/infraestructure/models/likeModel';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'monorail.proxy.rlwy.net',
    port: 28464,
    database: 'railway',
    username: 'postgres',
    password: 'uHmsXobsdCitaPAKPgTgdXZgmEACeZDY',
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