import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Connection URL y Database Name desde variables de entorno
const url = process.env.MONGO_URI as string;
const dbName = process.env.MONGO_DB_NAME as string;
const client = new MongoClient(url);

export async function initializeDatabasemongo() {
    try {
        // Usar el método connect para conectarse al servidor
        await client.connect();
        console.log('Conexión a MongoDB establecida correctamente.');
        
        const db = client.db(dbName);
        
        // Aquí podrías inicializar tus colecciones o hacer cualquier configuración adicional
        const collection = db.collection('documents');
        console.log(`Colección ${collection.collectionName} inicializada correctamente.`);
        
        // Realiza cualquier configuración adicional aquí si es necesario
        
        return 'done.';
    } catch (err) {
        console.error('No se pudo conectar a la base de datos:', err);
        process.exit(1);  // Cierra la aplicación si hay un error de conexión
    } finally {
        // Cerrar la conexión del cliente después de finalizar la operación
        await client.close();
    }
}

// Llama a la función para inicializar la base de datos
initializeDatabasemongo()
    .then(console.log)
    .catch(console.error);
