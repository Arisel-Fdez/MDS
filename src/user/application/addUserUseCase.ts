import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class AddUserUseCase {
    constructor(readonly userRepository: UserRepository) {}
    async run(name: string, last_name: string, email: string, password: string, profilePicture: string): Promise<User | null> {
        try {
            const createdUser = await this.userRepository.addUser(name, last_name, email, password, profilePicture);
            return createdUser;
        } catch (error) {
            console.error("Error in addUserUseCase:", error);
            return null;
        }
    }
}