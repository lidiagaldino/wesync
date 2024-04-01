import { HttpException } from '@nestjs/common';

export class Exception extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
