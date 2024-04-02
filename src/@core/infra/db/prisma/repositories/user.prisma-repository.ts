import { tbl_user } from '@prisma/client';
import { prisma } from '..';
import { User } from '../../../../domain/entities/user.entity';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { Email } from '../../../../domain/value-objects/email.value-object';
import { Password } from '../../../../domain/value-objects/password.value-object';
import { Url } from '../../../../domain/value-objects/url.value-object';
import { Status } from '../../../../domain/value-objects/status.value-object';

export class UserPrismaRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const result = await prisma.tbl_user.create({
      data: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail().getEmail(),
        password: user.getPassword().getPassword(),
        photo: user.getPhoto().getUrl(),
        status: user.getStatus().getName(),
      },
    });
    user.setId(result.id);
    return user;
  }
  async update(user: User): Promise<User> {
    await prisma.tbl_user.update({
      where: { id: user.getId() },
      data: {
        name: user.getName(),
        photo: user.getPhoto().getUrl(),
        status: user.getStatus().getName(),
      },
    });
    return user;
  }
  async changePassword(newPassword: Password, user: User): Promise<User> {
    await prisma.tbl_user.update({
      where: { id: user.getId() },
      data: {
        password: newPassword.getPassword(),
      },
    });
    user.setPassword(newPassword);
    return user;
  }
  async delete(user: User): Promise<void> {
    await prisma.tbl_user.delete({
      where: { id: user.getId() },
    });
    return;
  }
  async findById(id: number): Promise<User> {
    const result = await prisma.tbl_user.findUnique({
      where: { id },
    });
    return this.mapOutput(result);
  }
  async findByEmail(email: Email): Promise<User> {
    const result = await prisma.tbl_user.findUnique({
      where: { email: email.getEmail() },
    });
    return this.mapOutput(result);
  }
  async findAll(): Promise<User[]> {
    const result = await prisma.tbl_user.findMany();
    return result.map(this.mapOutput);
  }

  private mapOutput(user: tbl_user): User {
    const email = Email.create({ email: user.email }).getValue();
    const password = Password.create({ password: user.password }).getValue();
    const photo = Url.create({ url: user.photo }).getValue();
    const status = Status.create({ name: user.status }).getValue();
    const output = User.create({
      email,
      password,
      name: user.name,
      photo,
      status,
      songs: [],
    });
    return output.getValue();
  }
}
