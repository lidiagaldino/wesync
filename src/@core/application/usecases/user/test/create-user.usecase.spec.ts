import { TUserProps, User } from '../../../../domain/entities/user.entity';
import { IPasswordCryptography } from '../../../../domain/interfaces/password-cryptography.interface';
import { IValidator } from '../../../../domain/interfaces/validator.interface';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { right } from '../../../../domain/shared/core/result/right.core';
import { Email } from '../../../../domain/value-objects/email.value-object';
import { Password } from '../../../../domain/value-objects/password.value-object';
import { Status } from '../../../../domain/value-objects/status.value-object';
import { Url } from '../../../../domain/value-objects/url.value-object';
import { TInputUserDTO, TOutputUserDTO } from '../../../dto/user.dto';
import { CreateUserUsecase } from '../create-user.usecase';

const emailValue = 'john@example.com';
const name = 'John Doe';
const passwordValue = 'password';
const photoValue = 'https://example.com/photo.jpg';
const statusValue = 'active';
const hashedPasswordValue = 'hashedPassword';

const email = Email.create({ email: emailValue }).getValue();
const password = Password.create({ password: passwordValue }).getValue();
const photo = Url.create({ url: photoValue }).getValue();
const status = Status.create({ name: statusValue }).getValue();
const hashedPassword = Password.create({
  password: hashedPasswordValue,
}).getValue();
const userProps: TUserProps = {
  name,
  email,
  password,
  photo,
  status,
  songs: [],
};
const user = User.create({
  ...userProps,
  password: hashedPassword,
});

jest.mock('../../../factories/user.factory', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userFactory: jest.fn((_props) => right(user)),
}));

describe('CreateUserUsecase', () => {
  let userRepository: IUserRepository;
  let crypto: IPasswordCryptography;
  let validator: IValidator<TInputUserDTO>;
  let usecase: CreateUserUsecase;
  const schema = {};

  const createdUser = User.create({
    ...userProps,
    password: hashedPassword,
  }).getValue();
  createdUser.setId(1);

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = {
      create: jest.fn().mockResolvedValue(createdUser),
      update: jest.fn(),
      changePassword: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
    };
    crypto = {
      hash: jest.fn().mockResolvedValue(hashedPasswordValue),
      compare: jest.fn(),
    };
    validator = {
      validate: jest.fn(),
    };

    usecase = new CreateUserUsecase(userRepository, crypto, validator, schema);
  });

  it('should create a new user', async () => {
    const input: TInputUserDTO = {
      email: emailValue,
      name,
      photo: photoValue,
      password: passwordValue,
      status: statusValue,
    };

    const output: TOutputUserDTO = {
      id: 1,
      email: emailValue,
      name,
      photo: photoValue,
      status: statusValue,
    };

    const result = await usecase.execute(input);

    expect(crypto.hash).toHaveBeenCalledWith(passwordValue);
    expect(userRepository.create).toHaveBeenCalledWith(user.getValue());

    expect(result).toEqual(output);
  });
});
