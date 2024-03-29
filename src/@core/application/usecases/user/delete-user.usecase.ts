import { IUserRepository } from '../../../domain/repositories/user.repository';

export class DeleteUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    await this.userRepository.delete(user);
    return;
  }
}
