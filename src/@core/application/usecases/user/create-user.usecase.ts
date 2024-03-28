import { IPasswordCryptography } from '../../../domain/interfaces/password-cryptography.interface';
import { IValidator } from '../../../domain/interfaces/validator.interface';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { TInputUserDTO, TOutputUserDTO } from '../../dto/user.dto';
import { userFactory } from '../../factories/user.factory';
import { mapOutput } from './map';

export class CreateUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly crypto: IPasswordCryptography,
    private readonly validator: IValidator<TInputUserDTO>,
    private readonly schema: object,
  ) {}

  async execute(data: TInputUserDTO): Promise<TOutputUserDTO> {
    this.validate(data);
    const hashedPassword = await this.encryptPassword(data.password);
    const user = userFactory({ ...data, password: hashedPassword });
    if (user.isRight()) {
      const result = await this.userRepository.create(user.value.getValue());
      return mapOutput(result);
    }
  }

  /**
   * Validates the input data against the defined schema.
   *
   * @param data - The input data to be validated.
   * @returns A boolean value indicating whether the data is valid or not.
   */
  validate(data: TInputUserDTO): boolean {
    return this.validator.validate(this.schema, data);
  }
  /**
   * Encrypts the provided password using the password cryptography service.
   *
   * @param password - The password to be encrypted.
   * @returns A promise that resolves to the hashed password.
   */
  async encryptPassword(password: string): Promise<string> {
    return await this.crypto.hash(password);
  }
}
