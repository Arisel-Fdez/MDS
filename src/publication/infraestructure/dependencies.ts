import { DataUserPublicationRepository } from "./dataUserPublicationRepository";

import { UserPublicationUseCase } from "../application/userPublicationUserCase";
import { ViewPublicationsUseCase } from "../application/viewPublicationUseCase";
import { DeletePublicationUseCase } from "../application/deletePublicationUseCase";
import { UserPublicationController } from "./controller/userPublicationController";
import { ViewPublicationsController } from "./controller/ViewPublicationsController"; 
import { DeletePublicationController } from "./controller/DeletePublicationController"; 

import { FirebaseStorage } from "./adapters/firebaseStorage";
import { LocalFileStorage } from "./adapters/localFilesStorage";
import { AwsS3Storage } from "./adapters/awsS3Storage";

export const dataUsersRepository = new DataUserPublicationRepository();
//const awsS3Storage = new AwsS3Storage();
const firebaseStorage = new FirebaseStorage();
const localFileStorage = new LocalFileStorage();

export const userPublicationUseCase = new UserPublicationUseCase(dataUsersRepository);
export const viewPublicationsUseCase = new ViewPublicationsUseCase(dataUsersRepository);
export const deletePublicationUseCase = new DeletePublicationUseCase(dataUsersRepository);

export const userPublicationController = new UserPublicationController(userPublicationUseCase, firebaseStorage, localFileStorage);
export const viewPublicationsController = new ViewPublicationsController(viewPublicationsUseCase);
export const deletePublicationController = new DeletePublicationController(deletePublicationUseCase);

