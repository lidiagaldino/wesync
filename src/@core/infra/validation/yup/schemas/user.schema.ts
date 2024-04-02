import * as yup from 'yup';
import {
  TInputUpdateUserDTO,
  TInputUserDTO,
} from '../../../../application/dto/user.dto';

export const userSchema: yup.SchemaOf<TInputUserDTO> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  photo: yup.string().required(),
  status: yup.string().required(),
});

export const updateUserSchema: yup.SchemaOf<TInputUpdateUserDTO> = yup
  .object()
  .shape({
    name: yup.string().required(),
    photo: yup.string().required(),
    status: yup.string().required(),
  });
