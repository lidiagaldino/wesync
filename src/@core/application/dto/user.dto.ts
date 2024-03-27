export type TInputUserDTO = {
  name: string;
  email: string;
  password?: string;
};

export type TOutputUserDTO = {
  id: string;
  name: string;
  email: string;
};
