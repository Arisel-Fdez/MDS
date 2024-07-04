import { Request, Response } from "express";
import { ViewPublicationsUseCase } from "../../application/viewPublicationUseCase";

export class ViewPublicationsController {
    constructor(private viewPublicationUseCase: ViewPublicationsUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const publications = await this.viewPublicationUseCase.run();
            res.status(200).send(publications);
        } catch (error) {
            console.error("Error in ViewImagesController:", error);
            res.status(500).send({
                status: "error",
                message: "Error interno del servidor."
            });
        }
    }
}

