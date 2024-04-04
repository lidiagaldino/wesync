import { UserSong } from '../../../domain/entities/user-song.entity';
import { TOutputUserSongDTO } from '../../dto/user-song.dto';

export const mapOutput = (data: UserSong): TOutputUserSongDTO => {
  return {
    id: data.getId(),
    user_id: data.getUser().getId(),
    original_url: data.getSong().getOriginalUrl().getUrl(),
    url: data.getSong().getUrl().getUrl(),
    customName: data.getCustomName(),
    photo: data.getPhoto().getUrl(),
    isPublic: data.getIsPublic(),
    isFavorite: data.getIsFavorite(),
  };
};
