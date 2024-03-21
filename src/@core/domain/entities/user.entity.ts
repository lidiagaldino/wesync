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

/**
 * Represents a User entity.
 */
export class User {
  private id: number;
  private props: TUserProps;

  /**
   * Private constructor for User entity.
   * @param props - The properties of the User.
   */
  private constructor(props: TUserProps) {
    this.props = props;
  }

  /**
   * Creates a new User entity.
   * @param props - The properties of the User.
   * @returns A Result object containing either the created User entity or an error.
   */
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

  /**
   * Gets the ID of the User.
   * @returns The ID of the User.
   */
  getId() {
    return this.id;
  }

  /**
   * Gets the name of the User.
   * @returns The name of the User.
   */
  getName() {
    return this.props.name;
  }

  /**
   * Gets the email of the User.
   * @returns The email of the User.
   */
  getEmail() {
    return this.props.email;
  }

  /**
   * Gets the photo of the User.
   * @returns The photo of the User.
   */
  getPhoto() {
    return this.props.photo;
  }

  /**
   * Gets the status of the User.
   * @returns The status of the User.
   */
  getStatus() {
    return this.props.status;
  }

  /**
   * Sets the ID of the User.
   * @param id - The ID to set.
   */
  setId(id: number) {
    this.id = id;
  }

  /**
   * Sets the name of the User.
   * @param name - The name to set.
   */
  setName(name: string) {
    this.props.name = name;
  }

  /**
   * Sets the email of the User.
   * @param email - The email to set.
   */
  setEmail(email: Email) {
    this.props.email = email;
  }

  /**
   * Sets the photo of the User.
   * @param photo - The photo to set.
   */
  setPhoto(photo: Url) {
    this.props.photo = photo;
  }

  /**
   * Sets the status of the User.
   * @param status - The status to set.
   */
  setStatus(status: Status) {
    this.props.status = status;
  }
}
