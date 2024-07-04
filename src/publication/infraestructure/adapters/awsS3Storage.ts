import { s3, bucketName } from '../../../database/config/s3config';
import { IFileStorage } from '../../domain/ports/fileStorage';

export class AwsS3Storage implements IFileStorage {
    async saveFile(fileBuffer: Buffer, fileName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!bucketName) {
                reject(new Error("AWS bucket name is not defined."));
                return;
            }
            const params = {
                Bucket: bucketName,
                Key: fileName,
                Body: fileBuffer,
                ACL: 'public-read'
            };

            s3.upload(params, function (s3Err: any, data: any) {
                if (s3Err) {
                    reject(s3Err);
                    return;
                }
                console.log(`File uploaded successfully at ${data.Location}`);
                resolve(data.Location);
            });
        });
    }
}
