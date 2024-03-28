import { User } from '../../../domain/entities/user.entity';
import { TOutputUserDTO } from '../../dto/user.dto';

export function mapOutput(input: User): TOutputUserDTO {
  return {
    id: input.getId(),
    name: input.getName(),
    email: input.getEmail().getEmail(),
    photo: input.getPhoto().getUrl(),
    status: input.getStatus().getName(),
  };
}
