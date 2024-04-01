import { User } from '../../domain/entities/user.entity';
import { left } from '../../domain/shared/core/result/left.core';
import { right } from '../../domain/shared/core/result/right.core';
import { Response } from '../../domain/shared/core/result/response.core';
import { Email } from '../../domain/value-objects/email.value-object';
import { Password } from '../../domain/value-objects/password.value-object';
import { Status } from '../../domain/value-objects/status.value-object';
import { Url } from '../../domain/value-objects/url.value-object';
import { TInputUserDTO } from '../dto/user.dto';

export function userFactory(input: TInputUserDTO): Response<User> {
  const email = Email.create({ email: input.email });
  if (email.isFailure) {
    return left(email);
  }
  const password = Password.create({ password: input.password });
  if (password.isFailure) {
    return left(password);
  }
  const status = Status.create({ name: input.status });
  if (status.isFailure) {
    return left(status);
  }
  const photo = Url.create({ url: input.photo });
  if (photo.isFailure) {
    return left(photo);
  }
  const user = User.create({
    email: email.getValue(),
    password: password.getValue(),
    name: input.name,
    photo: photo.getValue(),
    songs: [],
    status: status.getValue(),
  });
  if (user.isFailure) {
    return left(user);
  }
  return right(user);
}
