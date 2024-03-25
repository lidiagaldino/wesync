import { Guard } from '../shared/core/guard/guard.core';
import { Result } from '../shared/core/result/result.core';
import { User } from './user.entity';

export type TMemberProps = {
  user: User;
  role: 'LISTENER' | 'ADMIN';
};

/**
 * A class that represents a party member.
 */
export class Member {
  private id: number;
  private props: TMemberProps;

  private constructor(props: TMemberProps) {
    this.props = props;
  }
  /**
   * Creates a new Member instance.
   * @param props - The properties of the member.
   * @returns A Result containing the member if the operation succeeded, or an error if it failed.
   */
  public static create(props: TMemberProps): Result<Member> {
    const guardResults = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.user,
        argumentName: 'user',
      },
      {
        argument: props.role,
        argumentName: 'role',
      },
    ]);

    if (guardResults.isFailure) {
      return Result.fail<Member>(guardResults.getErrorValue());
    }

    return Result.ok<Member>(new Member(props));
  }

  /**
   * Returns the id of the member.
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Returns the user of the member.
   */
  public getUser(): User {
    return this.props.user;
  }

  /**
   * Returns the role of the member.
   */
  public getRole(): 'LISTENER' | 'ADMIN' {
    return this.props.role;
  }

  /**
   * Sets the id of the member.
   * @param id - The id to set.
   */
  public setId(id: number): void {
    this.id = id;
  }

  /**
   * Sets the user of the member.
   * @param user - The user to set.
   */
  public setUser(user: User): void {
    this.props.user = user;
  }

  /**
   * Sets the role of the member.
   * @param role - The role to set.
   */
  public setRole(role: 'LISTENER' | 'ADMIN'): void {
    this.props.role = role;
  }
}
