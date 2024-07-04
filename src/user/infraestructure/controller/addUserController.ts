import { Request, Response } from "express";
import { AddUserUseCase } from "../../application/addUserUseCase";
import bcrypt from 'bcrypt';
import multer from 'multer';
import { IFileStorage } from '../../domain/ports/fileStorage';


import { AwsS3Storage } from '../adapters/awsS3Storage';
import { FirebaseStorage } from '../adapters/firebaseStorage';
import { LocalFileStorage } from '../adapters/localFilesStorage';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('profilePicture');

export class AddUsersController {
    constructor(
        readonly addUserUseCase: AddUserUseCase,
        private primaryFileStorage: IFileStorage,
        private secondaryFileStorage: IFileStorage,
    ) { }

    async run(req: Request, res: Response): Promise<void> {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ status: "error", message: "Error uploading image." });
            }

            try {
                let { name, last_name, email, password } = req.body;
                const saltRounds = 10;
                password = await bcrypt.hash(password, saltRounds);

                if (req.file) {
                    const fileName = `${Date.now()}-${req.file.originalname}`;
                    const fileBuffer = req.file.buffer;

                    try {
                        const primaryFileLocation = await this.primaryFileStorage.saveFile(fileBuffer, fileName);
                        const secondaryFileLocation = await this.secondaryFileStorage.saveFile(fileBuffer, fileName);
                        const createdUser = await this.addUserUseCase.run(name, last_name, email, password, primaryFileLocation);

                        if (createdUser) {
                            return res.status(201).send({
                                status: "success",
                                data: {
                                    name: createdUser.name,
                                    last_name: createdUser.last_name,
                                    email: createdUser.email,
                                    profilePicture: primaryFileLocation,
                                    backupProfilePicture: secondaryFileLocation
                                },
                                message: "Usuario creado exitosamente"
                            });
                        } else {
                            return res.status(400).send({
                                status: "error",
                                data: [],
                                message: "Error al crear usuario, inténtalo más tarde"
                            });
                        }
                    } catch (error) {
                        console.error("Error uploading file:", error);
                        return res.status(500).send({
                            status: "error",
                            message: "Failed to upload file."
                        });
                    }
                } else {
                    return res.status(400).send({ status: "error", message: "Profile picture is required." });
                }
            } catch (error) {
                console.error("Error in AddUsersController:", error);
                res.status(500).send({
                    status: "error",
                    message: "Error interno del servidor"
                });
            }
        });
    }
}
