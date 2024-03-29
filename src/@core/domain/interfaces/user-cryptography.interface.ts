import { IUserProps } from './user-payload.interface';

export interface IUserCryptography {
  verify(value: string): IUserProps;
  encrypt(object: IUserProps): string;
}
