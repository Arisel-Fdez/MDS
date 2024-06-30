import { DataUserRepository } from "./dataUserRepository";

import { AddUserUseCase } from "../application/addUserUseCase";
import { AddUsersController } from "./controller/addUserController";
import { ListAllUsersController } from "./controller/listAllUserController";
import { ListAllUserUseCase } from "../application/listAllUserUseCase";
import { DeleteUserUseCase } from "../application/deleteUserUseCase";
import { DeleteUserController } from "./controller/deleteUserController";
import { LocalFileStorage } from "./adapters/localFilesStorage";
import { AwsS3Storage } from "./adapters/awsS3Storage";

const useLocal = process.env.USE_LOCAL_STORAGE === 'true';

const fileStorage = useLocal ? new LocalFileStorage() : new AwsS3Storage();




export const dataUsersRepository = new DataUserRepository();

export const addUsersUseCase = new AddUserUseCase(dataUsersRepository);
export const addUsersController = new AddUsersController(addUsersUseCase, fileStorage);

export const listAllUsersUseCase = new ListAllUserUseCase(dataUsersRepository);
export const listAllUsersController = new ListAllUsersController(listAllUsersUseCase);

export const deletedUsersUseCase = new DeleteUserUseCase(dataUsersRepository);
export const deleteUserController = new DeleteUserController(deletedUsersUseCase);

