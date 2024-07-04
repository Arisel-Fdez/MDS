import { Request, Response } from "express";
import { UserPublicationUseCase } from "../../application/userPublicationUserCase";
import multer from 'multer';
import { IFileStorage } from '../../domain/ports/fileStorage';

import { AwsS3Storage } from '../adapters/awsS3Storage';
import { FirebaseStorage } from '../adapters/firebaseStorage';
import { LocalFileStorage } from '../adapters/localFilesStorage';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('multimedia');

export class UserPublicationController {
    constructor(
        private readonly userPublicationUseCase: UserPublicationUseCase,
        private readonly primaryFileStorage: IFileStorage,
        private readonly secondaryFileStorage: IFileStorage
    ) { }

    async run(req: Request, res: Response) {
        try {
            upload(req, res, async (err) => {
                if (err) {
                    return res.status(400).send({ status: "error", message: "Error al subir multimedia." });
                }

                const userId: number = parseInt(req.body.userId);
                const description: string = req.body.description;

                if (req.file) {
                    const fileName = `${Date.now()}-${req.file.originalname}`;
                    const fileBuffer = req.file.buffer;

                    try {
                        const primaryFileLocation = await this.primaryFileStorage.saveFile(fileBuffer, fileName);
                        const secondaryFileLocation = await this.secondaryFileStorage.saveFile(fileBuffer, fileName);

                        let createdPublication;
                        try {
                            createdPublication = await this.userPublicationUseCase.run(userId, description, primaryFileLocation);
                        } catch (useCaseError) {
                            console.error('Error al crear la publicación:', useCaseError);
                            return res.status(500).send({ status: "error", message: "Error al procesar la publicación." });
                        }

                        if (createdPublication) {
                            return res.status(201).send({
                                status: "success",
                                data: {
                                    id: createdPublication.id,
                                    description: createdPublication.description,
                                    multimedia: primaryFileLocation,
                                    backupMultimedia: secondaryFileLocation
                                },
                                message: "Publicación creada exitosamente."
                            });
                        } else {
                            return res.status(400).send({
                                status: "error",
                                data: [],
                                message: "No se pudo crear la publicación, intente más tarde."
                            });
                        }
                    } catch (error) {
                        console.error("Error al subir archivo:", error);
                        return res.status(500).send({ status: "error", message: "Error al subir multimedia." });
                    }
                } else {
                    return res.status(400).send({ status: "error", message: "Se requiere multimedia." });
                }
            });
        } catch (error) {
            console.error("Error en UserPublicationController:", error);
            res.status(500).send({
                status: "error",
                message: "Error interno del servidor."
            });
        }
    }
}
