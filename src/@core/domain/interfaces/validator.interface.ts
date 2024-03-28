export interface IValidator<T> {
  validate(schema: any, props: T): boolean;
}
