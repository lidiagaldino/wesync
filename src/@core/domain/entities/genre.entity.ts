import { Guard } from "../shared/core/guard/guard.core";
import { Result } from "../shared/core/result/result.core";

export type TGenreProps = {
  name: string;
};

/**
 * Represents a Genre entity.
 */
export class Genre {
  private id: number;
  private props: TGenreProps;

  /**
   * Private constructor for Genre entity.
   * @param props - The properties of the Genre.
   */
  private constructor(props: TGenreProps) {
    this.props = props;
  }

  /**
   * Creates a new Genre entity.
   * @param props - The properties of the Genre.
   * @returns A Result object containing the created Genre entity.
   */
  public static create(props: TGenreProps): Result<Genre> {
    const guardResults = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
    ]);

    if (guardResults.isFailure) {
      return Result.fail<Genre>(guardResults.getErrorValue());
    }

    return Result.ok(new Genre(props));
  }

  /**
   * Gets the ID of the Genre.
   * @returns The ID of the Genre.
   */
  getId() {
    return this.id;
  }

  /**
   * Gets the name of the Genre.
   * @returns The name of the Genre.
   */
  getName() {
    return this.props.name;
  }

  /**
   * Sets the ID of the Genre.
   * @param id - The ID to set.
   */
  setId(id: number) {
    this.id = id;
  }

  /**
   * Sets the name of the Genre.
   * @param name - The name to set.
   */
  setName(name: string) {
    this.props.name = name;
  }
}
