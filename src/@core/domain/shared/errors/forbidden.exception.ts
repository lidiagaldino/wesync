import { Exception } from './exception';

export class ForbiddenException extends Exception {
  constructor() {
    super('FORBIDDEN', 403);
  }
}
