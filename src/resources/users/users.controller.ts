import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateUserUsecase } from '../../@core/application/usecases/user/create-user.usecase';
import { UpdateUserUsecase } from '../../@core/application/usecases/user/update-user.usecase';
import { DeleteUserUsecase } from '../../@core/application/usecases/user/delete-user.usecase';
import { FindAllUserUsecase } from '../../@core/application/usecases/user/find-all-user.usecase';
import { FindUserByIdUsecase } from '../../@core/application/usecases/user/find-user-by-id.usecase';
import { SignInUserUsecase } from '../../@core/application/usecases/user/sign-in-user.usecase';
import {
  TInputUpdateUserDTO,
  TInputUserDTO,
} from '../../@core/application/dto/user.dto';
import { TInputLoginDTO } from '../../@core/application/dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUsecase: CreateUserUsecase,
    private readonly updateUsecase: UpdateUserUsecase,
    private readonly deleteUsecase: DeleteUserUsecase,
    private readonly findAllUsecase: FindAllUserUsecase,
    private readonly findByIdUsecase: FindUserByIdUsecase,
    private readonly signinUsecase: SignInUserUsecase,
  ) {}

  @Post()
  create(@Body() createUserDto: TInputUserDTO) {
    return this.createUsecase.execute(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: TInputLoginDTO) {
    return this.signinUsecase.execute(loginUserDto);
  }

  @Get()
  findAll() {
    return this.findAllUsecase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdUsecase.execute(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: TInputUpdateUserDTO) {
    return this.updateUsecase.execute(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteUsecase.execute(+id);
  }
}
