import { DataUserPublicationRepository } from "./dataUserPublicationRepository";

import { UserPublicationUseCase } from "../application/userPublicationUserCase";
import { ViewPublicationsUseCase } from "../application/viewPublicationUseCase";
import { DeletePublicationUseCase } from "../application/deletePublicationUseCase";
import { UserPublicationController } from "./controller/userPublicationController";
import { ViewPublicationsController } from "./controller/ViewPublicationsController"; 
import { DeletePublicationController } from "./controller/DeletePublicationController"; 
import { ViewImagesController } from "./controller/viewImagesController";
import { ViewImagesUseCase } from "../application/viewImagesUseCase";
import { ViewAudiosController } from "./controller/viewAudioController";
import { ViewAudiosUseCase } from "../application/viewAudioUseCase";
import { ViewGifsController } from "./controller/viewGifsController";
import { ViewGifsUseCase } from "../application/viewGifsUseCase";
import { ViewPDFController } from "./controller/viewPDFsController";
import { ViewPDFUseCase } from "../application/viewPDFsUseCase";
import { ViewVideosController } from "./controller/viewVideosController";
import { ViewVideosUseCase } from "../application/viewVideosUseCase";

export const dataUsersRepository = new DataUserPublicationRepository();

export const userPublicationUseCase = new UserPublicationUseCase(dataUsersRepository);
export const viewPublicationsUseCase = new ViewPublicationsUseCase(dataUsersRepository);
export const deletePublicationUseCase = new DeletePublicationUseCase(dataUsersRepository);

export const userPublicationController = new UserPublicationController(userPublicationUseCase);
export const viewPublicationsController = new ViewPublicationsController(viewPublicationsUseCase);
export const deletePublicationController = new DeletePublicationController(deletePublicationUseCase);


export const viewImagesUseCase = new ViewImagesUseCase(dataUsersRepository); 
export const viewImagesController = new ViewImagesController(viewImagesUseCase);

export const viewAudiosUseCase = new ViewAudiosUseCase(dataUsersRepository);
export const viewAudioController = new ViewAudiosController(viewAudiosUseCase);

export const viewGifsUseCase = new ViewGifsUseCase(dataUsersRepository);
export const viewGifsController = new ViewGifsController(viewGifsUseCase);

export const viewPDFsUseCase = new ViewPDFUseCase(dataUsersRepository);
export const viewPDFsController = new ViewPDFController(viewPDFsUseCase);

export const viewVideosUseCase = new ViewVideosUseCase(dataUsersRepository);
export const viewVideosController = new ViewVideosController(viewVideosUseCase);