import { Request, Response } from "express";
import { ListAllUserUseCase } from "../../application/listAllUserUseCase";

export class ListAllUsersController {
    constructor(readonly listAllUserUseCase: ListAllUserUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const users = await this.listAllUserUseCase.run();
            res.status(200).send(users);
        } catch (error) {
            console.error("Error al listar usuarios:", error);
            res.status(500).send({ status: "error", message: "Error interno del servidor" });
        }
    }
}
