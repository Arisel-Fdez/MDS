import { Request, Response } from "express";
import { DeletePublicationUseCase } from "../../application/deletePublicationUseCase";

export class DeletePublicationController {
    constructor(private readonly deletePublicationUseCase: DeletePublicationUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const publicationId = req.params.id; 

            await this.deletePublicationUseCase.run(publicationId);

            res.status(200).send({
                status: "success",
                message: "Publicación eliminada exitosamente."
            });

        } catch (error) {
            console.error("Error en DeletePublicationController:", error);
            res.status(500).send({
                status: "error",
                message: "Error interno del servidor."
            });
        }
    }
}
