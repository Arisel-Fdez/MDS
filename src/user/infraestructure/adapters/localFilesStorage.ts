// adapters/localFileStorage.ts
import fs from 'fs';
import path from 'path';
import { IFileStorage } from '../../domain/ports/fileStorage';

export class LocalFileStorage implements IFileStorage {
    private basePath: string;

    constructor() {
        this.basePath = path.join(__dirname, '../../uploads');
    }

    async saveFile(fileBuffer: Buffer, fileName: string): Promise<string> {
        const filePath = path.join(this.basePath, fileName);
        fs.writeFileSync(filePath, fileBuffer);
        console.log(`File saved locally at ${filePath}`);
        return filePath;
    }
}
