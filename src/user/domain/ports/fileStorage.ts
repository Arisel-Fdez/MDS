export interface IFileStorage {
    saveFile(fileBuffer: Buffer, fileName: string): Promise<string>;
}
