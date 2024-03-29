import { IUserRepository } from '../../../domain/repositories/user.repository';
import { TOutputUserDTO } from '../../dto/user.dto';
import { mapOutput } from './map';

export class FindUserByIdUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<TOutputUserDTO> {
    const user = await this.userRepository.findById(id);
    return mapOutput(user);
  }
}
