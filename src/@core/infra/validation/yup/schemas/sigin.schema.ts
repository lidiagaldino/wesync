import * as yup from 'yup';
import { TInputLoginDTO } from '../../../../application/dto/login.dto';

export const siginSchema: yup.SchemaOf<TInputLoginDTO> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
