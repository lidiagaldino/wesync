import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';

export class DeleteUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    await this.userRepository.delete(user);
    return;
  }
}
