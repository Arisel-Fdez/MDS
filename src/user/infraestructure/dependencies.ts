import { DataUserRepository } from "./dataUserRepository";

import { AddUserUseCase } from "../application/addUserUseCase";
import { AddUsersController } from "./controller/addUserController";
import { ListAllUsersController } from "./controller/listAllUserController";
import { ListAllUserUseCase } from "../application/listAllUserUseCase";
import { DeleteUserUseCase } from "../application/deleteUserUseCase";
import { DeleteUserController } from "./controller/deleteUserController";
import { LocalFileStorage } from "./adapters/localFilesStorage";
import { AwsS3Storage } from "./adapters/awsS3Storage";
import { FirebaseStorage } from "./adapters/firebaseStorage";


//const awsS3Storage = new AwsS3Storage();
const firebaseStorage = new FirebaseStorage();
const localFileStorage = new LocalFileStorage();


export const dataUsersRepository = new DataUserRepository();

export const addUsersUseCase = new AddUserUseCase(dataUsersRepository);
export const addUsersController = new AddUsersController(addUsersUseCase,firebaseStorage, localFileStorage);

export const listAllUsersUseCase = new ListAllUserUseCase(dataUsersRepository);
export const listAllUsersController = new ListAllUsersController(listAllUsersUseCase);

export const deletedUsersUseCase = new DeleteUserUseCase(dataUsersRepository);
export const deleteUserController = new DeleteUserController(deletedUsersUseCase);

