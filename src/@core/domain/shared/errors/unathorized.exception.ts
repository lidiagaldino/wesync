import { Exception } from './exception';

export class UnauthorizedException extends Exception {
  constructor() {
    super('UNAUTHORIZED', 401);
  }
}
