import { Guard } from '../shared/core/guard/guard.core';
import { Result } from '../shared/core/result/result.core';

export type TStatusProps = {
  name: string;
};

/**
 * Represents a status value object.
 */
export class Status {
  private props: TStatusProps;

  /**
   * Private constructor for creating a Status object.
   * @param props - The properties of the status.
   */
  private constructor(props: TStatusProps) {
    this.props = props;
  }

  /**
   * Creates a new Status object.
   * @param props - The properties of the status.
   * @returns A Result object containing the created Status object or an error.
   */
  public static create(props: TStatusProps): Result<Status> {
    const guardResult = Guard.againstNullOrUndefined(props.name, 'name');
    if (guardResult.isFailure) {
      return Result.fail<Status>(guardResult.getErrorValue());
    }
    return Result.ok<Status>(new Status(props));
  }

  /**
   * Gets the name of the status.
   * @returns The name of the status.
   */
  getName() {
    return this.props.name;
  }
}
