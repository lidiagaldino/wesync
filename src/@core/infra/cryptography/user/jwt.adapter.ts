import { IUserCryptography } from '../../../domain/interfaces/user-cryptography.interface';
import * as jwt from 'jsonwebtoken';
import { IUserProps } from '../../../domain/interfaces/user-payload.interface';

export class JwtAdapter implements IUserCryptography {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string,
  ) {}
  verify(value: string): IUserProps {
    return jwt.verify(value, this.secret) as IUserProps;
  }
  encrypt(object: IUserProps): string {
    return jwt.sign(object, this.secret, { expiresIn: this.expiresIn });
  }
}
