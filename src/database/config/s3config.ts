
import AWS from 'aws-sdk';

// Configuración inicial de S3 con credenciales y región
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const bucketName = process.env.AWS_S3_BUCKET_NAME || "default-bucket-name";

export const uploadFileToS3 = (fileBuffer: Buffer, fileName: string): Promise<string> => {
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

        s3.upload(params, function(s3Err:any, data:any) {
            if (s3Err) {
                reject(s3Err);
                return;
            }
            console.log(`File uploaded successfully at ${data.Location}`);
            resolve(data.Location);
        });
    });
};
