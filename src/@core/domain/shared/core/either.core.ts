import { Left } from "./left.core";
import { Right } from "./right.core";

export type Either<L, A> = Left<L, A> | Right<L, A>;
