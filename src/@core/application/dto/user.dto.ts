export type TInputUserDTO = {
  name: string;
  email: string;
  password?: string;
  photo: string;
  status: string;
};

export type TOutputUserDTO = {
  id: number;
  name: string;
  email: string;
  photo: string;
  status: string;
};
