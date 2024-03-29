import { User } from '../../../domain/entities/user.entity';
import { IValidator } from '../../../domain/interfaces/validator.interface';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { Status } from '../../../domain/value-objects/status.value-object';
import { Url } from '../../../domain/value-objects/url.value-object';
import {
  TInputUpdateUserDTO,
  TInputUserDTO,
  TOutputUserDTO,
} from '../../dto/user.dto';
import { mapOutput } from './map';

export class UpdateUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly validator: IValidator<TInputUpdateUserDTO>,
    private readonly schema: object,
  ) {}

  async execute(id: number, data: TInputUserDTO): Promise<TOutputUserDTO> {
    this.validator.validate(this.schema, data);
    const user = await this.userRepository.findById(id);

    const result = await this.userRepository.update(this.setData(user, data));

    return mapOutput(result);
  }

  /**
   * Updates the user's data.
   *
   * @param user - The user entity to be updated.
   * @param data - The input data containing the new values for the user.
   *
   * @returns The updated user entity.
   */
  setData(user: User, data: TInputUpdateUserDTO): User {
    const photo = Url.create({ url: data.photo });
    const status = Status.create({ name: data.status });
    user.setName(data.name);
    user.setPhoto(photo.getValue());
    user.setStatus(status.getValue());

    return user;
  }
}
