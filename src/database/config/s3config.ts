import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

console.log('AWS Configuration:', {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_S3_BUCKET_NAME
});

// Configuración inicial de S3 con credenciales y región
export const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

export const bucketName = process.env.AWS_S3_BUCKET_NAME || "default-bucket-name";
