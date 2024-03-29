import { IUserRepository } from '../../../domain/repositories/user.repository';
import { TOutputUserDTO } from '../../dto/user.dto';
import { mapOutput } from './map';

export class FindAllUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<TOutputUserDTO[]> {
    const user = await this.userRepository.findAll();
    return user.map(mapOutput);
  }
}
