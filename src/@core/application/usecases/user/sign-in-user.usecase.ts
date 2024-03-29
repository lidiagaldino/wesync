import { IPasswordCryptography } from '../../../domain/interfaces/password-cryptography.interface';
import { IUserCryptography } from '../../../domain/interfaces/user-cryptography.interface';
import { IValidator } from '../../../domain/interfaces/validator.interface';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { Email } from '../../../domain/value-objects/email.value-object';
import { TInputLoginDTO, TOutputLoginDTO } from '../../dto/login.dto';

export class SignInUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly validator: IValidator<TInputLoginDTO>,
    private readonly schema: object,
    private readonly crypto: IPasswordCryptography,
    private readonly userCryptography: IUserCryptography,
  ) {}

  async execute(data: TInputLoginDTO): Promise<TOutputLoginDTO> {
    this.validator.validate(this.schema, data);
    const email = Email.create({ email: data.email });
    //TODO: validate if email is right
    const user = await this.userRepository.findByEmail(email.getValue());
    if (!user) return; //TODO: throw an not found error

    const isPasswordValid = await this.crypto.compare(
      data.password,
      user.getPassword().getPassword(),
    );
    if (!isPasswordValid) return; //TODO: thrown an unauthorized error

    const token = this.userCryptography.encrypt({
      email: user.getEmail().getEmail(),
      name: user.getName(),
      id: user.getId(),
      photo: user.getPhoto().getUrl(),
      status: user.getStatus().getName(),
    });

    return { token };
  }
}
