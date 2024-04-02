import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { TOutputUserDTO } from '../../dto/user.dto';
import { mapOutput } from './map';

export class FindUserByIdUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<TOutputUserDTO> {
    const user = await this.userRepository.findById(id);
    if (user) return mapOutput(user);
    throw new NotFoundException('USER_NOT_FOUND');
  }
}
