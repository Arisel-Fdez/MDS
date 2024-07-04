import { LikeController } from "../infraestructure/controller/likeController";
import { DataLikeRepository } from "./datalLikeRepository";
import { LikeUseCase } from "../application/likeUseCase";


export const dataLikeRepository = new DataLikeRepository();
export const likeUseCase = new LikeUseCase(dataLikeRepository);
export const likeController = new LikeController(likeUseCase);