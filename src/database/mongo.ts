import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://mongo:nKPKzKGaMkSkFCVlCfKeaCvVaUHGqCyb@viaduct.proxy.rlwy.net:21821';
const client = new MongoClient(url);

// Database Name
const dbName = 'test';

export async function initializeDatabasemongo() {
    try {
        // Use connect method to connect to the server
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
    }
}

// Llama a la función para inicializar la base de datos
initializeDatabasemongo()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
