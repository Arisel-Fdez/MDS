import { bucket } from '../../../database/config/firebase';
import { IFileStorage } from '../../domain/ports/fileStorage';

export class FirebaseStorage implements IFileStorage {
    async saveFile(fileBuffer: Buffer, fileName: string): Promise<string> {
        const file = bucket.file(fileName);

        return new Promise((resolve, reject) => {
            const stream = file.createWriteStream({
                metadata: {
                    contentType: 'application/octet-stream',
                },
            });

            stream.on('error', (err) => {
                reject(err);
            });

            stream.on('finish', async () => {
                await file.makePublic();
                resolve(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
            });

            stream.end(fileBuffer);
        });
    }
}
