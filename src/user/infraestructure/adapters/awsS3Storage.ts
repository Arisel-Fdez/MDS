import AWS from 'aws-sdk';
import { IFileStorage } from '../../domain/ports/fileStorage';

export class AwsS3Storage implements IFileStorage {
    private s3: AWS.S3;
    private bucketName: string;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });
        this.bucketName = process.env.AWS_S3_BUCKET_NAME || "default-bucket-name";
    }

    async saveFile(fileBuffer: Buffer, fileName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.bucketName) {
                reject(new Error("AWS bucket name is not defined."));
                return;
            }
            const params = {
                Bucket: this.bucketName,
                Key: fileName,
                Body: fileBuffer,
                ACL: 'public-read'
            };

            this.s3.upload(params, function(s3Err: any, data:any) {
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
