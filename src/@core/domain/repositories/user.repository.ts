import { User } from "../entities/user.entity";
import { Email } from "../value-objects/email.value-object";

/**
 * Interface for the user repository.
 */
export interface IUserRepository {
    create(user: User): Promise<User>
    update(user: User): Promise<User>
    changePassword(newPassword: string, user: User): Promise<User>
    delete(user: User): Promise<void>
    findById(id: number): Promise<User>
    findByEmail(email: Email): Promise<User>
    findAll(): Promise<User>
}