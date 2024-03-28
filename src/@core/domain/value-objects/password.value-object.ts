import { Guard } from '../shared/core/guard/guard.core';
import { Result } from '../shared/core/result/result.core';

export type TPasswordProps = {
  password: string;
};

export class Password {
  private props: TPasswordProps;

  private constructor(props: TPasswordProps) {
    this.props = props;
  }

  public static create(props: TPasswordProps): Result<Password> {
    const guardResults = Guard.combine([
      Guard.againstNullOrUndefined(props.password, 'password'),
      Guard.againstAtLeast(8, 'password'),
    ]);

    if (guardResults.isFailure) {
      return Result.fail(guardResults.getErrorValue());
    }

    return Result.ok(new Password(props));
  }
}
