// controllers/AddUsersController.ts
import { Request, Response } from "express";
import { AddUserUseCase } from "../../application/addUserUseCase";
import bcrypt from 'bcrypt';
import multer from 'multer';
import { IFileStorage } from '../../domain/ports/fileStorage';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export class AddUsersController {
    constructor(
        readonly addUserUseCase: AddUserUseCase,
        private fileStorage: IFileStorage
    ) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            upload.single('profilePicture')(req, res, async (err) => {
                if (err) {
                    return res.status(400).send({ status: "error", message: "Error uploading image." });
                }

                let { name, last_name, email, password } = req.body;
                const saltRounds = 10;
                password = await bcrypt.hash(password, saltRounds);

                if (req.file) {
                    const fileName = `${Date.now()}-${req.file.originalname}`;
                    const fileBuffer = req.file.buffer;

                    try {
                        const fileLocation = await this.fileStorage.saveFile(fileBuffer, fileName);

                        let createdUser = await this.addUserUseCase.run(name, last_name, email, password, fileLocation);

                        if (createdUser) {
                            return res.status(201).send({
                                status: "success",
                                data: {
                                    name: createdUser.name,
                                    last_name: createdUser.last_name,
                                    email: createdUser.email,
                                    profilePicture: fileLocation
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
            });
        } catch (error) {
            console.error("Error in AddUsersController:", error);
            res.status(500).send({
                status: "error",
                message: "Error interno del servidor"
            });
        }
    }
}
