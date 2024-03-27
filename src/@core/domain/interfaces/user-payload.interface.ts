import {  TStatusProps } from "../value-objects/status.value-object";

export interface IUserProps {
    name: string;
    email: string;
    photo: string;
    status: TStatusProps;
  };