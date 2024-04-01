import { Either } from './either.core';
import { Result } from './result.core';

export type Response<T> = Either<Result<any>, Result<T>>;
