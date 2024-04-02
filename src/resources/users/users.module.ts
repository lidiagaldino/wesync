import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserPrismaRepository } from '../../@core/infra/db/prisma/repositories/user.prisma-repository';
import { BcryptAdapter } from '../../@core/infra/cryptography/password/bcrypt.adapter';
import { JwtAdapter } from '../../@core/infra/cryptography/user/jwt.adapter';
import { CreateUserUsecase } from '../../@core/application/usecases/user/create-user.usecase';
import { IPasswordCryptography } from '../../@core/domain/interfaces/password-cryptography.interface';
import { IUserRepository } from '../../@core/domain/repositories/user.repository';
import { IValidator } from '../../@core/domain/interfaces/validator.interface';
import {
  TInputUpdateUserDTO,
  TInputUserDTO,
} from '../../@core/application/dto/user.dto';
import {
  updateUserSchema,
  userSchema,
} from '../../@core/infra/validation/yup/schemas/user.schema';
import { YupAdapter } from '../../@core/infra/validation/yup/yup.adapter';
import { UpdateUserUsecase } from '../../@core/application/usecases/user/update-user.usecase';
import { DeleteUserUsecase } from '../../@core/application/usecases/user/delete-user.usecase';
import { FindAllUserUsecase } from '../../@core/application/usecases/user/find-all-user.usecase';
import { FindUserByIdUsecase } from '../../@core/application/usecases/user/find-user-by-id.usecase';
import { SignInUserUsecase } from '../../@core/application/usecases/user/sign-in-user.usecase';
import { TInputLoginDTO } from '../../@core/application/dto/login.dto';
import { IUserCryptography } from '../../@core/domain/interfaces/user-cryptography.interface';
import { siginSchema } from '../../@core/infra/validation/yup/schemas/sigin.schema';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: UserPrismaRepository, useClass: UserPrismaRepository },
    {
      provide: BcryptAdapter,
      useFactory: () => new BcryptAdapter(Number(process.env.SALT)),
    },
    {
      provide: JwtAdapter,
      useFactory: () =>
        new JwtAdapter(process.env.SECRET, process.env.EXPIRES_IN),
    },
    {
      provide: YupAdapter,
      useClass: YupAdapter,
    },
    {
      provide: CreateUserUsecase,
      useFactory: (
        userRepository: IUserRepository,
        passwordCrypto: IPasswordCryptography,
        validator: IValidator<TInputUserDTO>,
      ) =>
        new CreateUserUsecase(
          userRepository,
          passwordCrypto,
          validator,
          userSchema,
        ),
      inject: [UserPrismaRepository, BcryptAdapter, YupAdapter],
    },
    {
      provide: UpdateUserUsecase,
      useFactory: (
        userRepository: IUserRepository,
        validator: IValidator<TInputUpdateUserDTO>,
      ) => new UpdateUserUsecase(userRepository, validator, updateUserSchema),
      inject: [UserPrismaRepository, YupAdapter],
    },
    {
      provide: DeleteUserUsecase,
      useFactory: (userRepository: IUserRepository) =>
        new DeleteUserUsecase(userRepository),
      inject: [UserPrismaRepository],
    },
    {
      provide: FindAllUserUsecase,
      useFactory: (userRepository: IUserRepository) =>
        new FindAllUserUsecase(userRepository),
      inject: [UserPrismaRepository],
    },
    {
      provide: FindUserByIdUsecase,
      useFactory: (userRepository: IUserRepository) =>
        new FindAllUserUsecase(userRepository),
      inject: [UserPrismaRepository],
    },
    {
      provide: SignInUserUsecase,
      useFactory: (
        userRepository: IUserRepository,
        validator: IValidator<TInputLoginDTO>,
        crypto: IPasswordCryptography,
        userCryptography: IUserCryptography,
      ) =>
        new SignInUserUsecase(
          userRepository,
          validator,
          siginSchema,
          crypto,
          userCryptography,
        ),
      inject: [UserPrismaRepository, YupAdapter, JwtAdapter, BcryptAdapter],
    },
  ],
})
export class UsersModule {}
