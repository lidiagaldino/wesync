import { User } from '../../../domain/entities/user.entity';
import { IPasswordCryptography } from '../../../domain/interfaces/password-cryptography.interface';
import { IUserCryptography } from '../../../domain/interfaces/user-cryptography.interface';
import { IValidator } from '../../../domain/interfaces/validator.interface';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { NotFoundException } from '../../../domain/shared/errors/not-found.exception';
import { UnauthorizedException } from '../../../domain/shared/errors/unathorized.exception';
import { Email } from '../../../domain/value-objects/email.value-object';
import { TInputLoginDTO, TOutputLoginDTO } from '../../dto/login.dto';
import { emailFactory } from '../../factories/email.factory';

export class SignInUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly validator: IValidator<TInputLoginDTO>,
    private readonly schema: object,
    private readonly crypto: IPasswordCryptography,
    private readonly userCryptography: IUserCryptography,
  ) {}

  /**
   * Executes the login process for a user.
   *
   * @param data - The input data containing the user's email and password.
   * @returns A promise that resolves to a token if the login is successful, otherwise rejects with an appropriate error.
   */
  async execute(data: TInputLoginDTO): Promise<TOutputLoginDTO> {
    this.validate(data);
    const email = this.handleEmail(data.email);
    const user = await this.handleFindUser(email);

    await this.validatePassword(
      data.password,
      user.getPassword().getPassword(),
    );

    const token = this.generateToken(user);

    return { token };
  }

  /**
   * Handles the email validation and extraction.
   *
   * @param value - The input email value.
   * @returns The validated email value if successful, otherwise throws a BadRequestException with the error value.
   */
  private handleEmail(value: string): Email {
    const email = emailFactory(value);
    if (email.isRight()) return email.value.getValue();
    throw new BadRequestException(email.value.getErrorValue());
  }

  /**
   * Finds a user by email.
   *
   * @param email - The email of the user to be found.
   * @returns The user if found, otherwise throws a NotFoundException.
   */
  private async handleFindUser(email: Email): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    return user;
  }

  /**
   * Validates the provided password against the stored hash.
   *
   * @param password - The password to be validated.
   * @param hash - The hashed password to compare with.
   * @throws UnauthorizedException if the password is invalid.
   */
  private async validatePassword(password: string, hash: string) {
    const isPasswordValid = await this.crypto.compare(hash, password);
    if (!isPasswordValid) throw new UnauthorizedException();
  }

  /**
   * Generates a JSON Web Token (JWT) for the given user.
   *
   * @param user - The user for whom the JWT is to be generated.
   * @returns The JWT for the given user.
   */
  private generateToken(user: User): string {
    const token = this.userCryptography.encrypt({
      email: user.getEmail().getEmail(),
      name: user.getName(),
      id: user.getId(),
      photo: user.getPhoto().getUrl(),
      status: user.getStatus().getName(),
    });
    return token;
  }

  /**
   * Validates the input data against the defined schema.
   *
   * @param data - The input data to be validated.
   * @returns A boolean value indicating whether the data is valid or not.
   */
  validate(data: TInputLoginDTO): boolean {
    const result = this.validator.validate(this.schema, data);
    if (result.isValid) return true;
    throw new BadRequestException(result.errorsResult);
  }
}
