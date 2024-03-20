import { Guard } from '../shared/core/guard/guard.core';
import { Result } from '../shared/core/result/result.core';
import { Email } from '../value-objects/email.value-object';
import { Status } from '../value-objects/status.value-object';
import { Url } from '../value-objects/url.value-object';

export type TUserProps = {
  name: string;
  email: Email;
  photo: Url;
  status: Status;
};

export class User {
  private id: number;
  private props: TUserProps;

  private constructor(props: TUserProps) {
    this.props = props;
  }

  public static create(props: TUserProps): Result<User> {
    const guardResults = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.photo, argumentName: 'photo' },
      { argument: props.status, argumentName: 'status' },
    ]);

    if (guardResults.isFailure) {
      return Result.fail<User>(guardResults.getErrorValue());
    }

    return Result.ok(new User(props));
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.props.name;
  }

  getEmail() {
    return this.props.email;
  }

  getPhoto() {
    return this.props.photo;
  }

  getStatus() {
    return this.props.status;
  }

  setId(id: number) {
    this.id = id;
  }

  setName(name: string) {
    this.props.name = name;
  }

  setEmail(email: Email) {
    this.props.email = email;
  }

  setPhoto(photo: Url) {
    this.props.photo = photo;
  }

  setStatus(status: Status) {
    this.props.status = status;
  }
}
