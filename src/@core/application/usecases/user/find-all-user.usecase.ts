import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TOutputUserDTO } from '../../dto/user.dto';
import { mapOutput } from './map';

export class FindAllUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<TOutputUserDTO[]> {
    const user = await this.userRepository.findAll();
    if (user) return user.map(mapOutput);
    throw new NotFoundException('USER_NOT_FOUND');
  }
}
