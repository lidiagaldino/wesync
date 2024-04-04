import { Song } from '../../../domain/entities/song.entity';
import { UserSong } from '../../../domain/entities/user-song.entity';
import { User } from '../../../domain/entities/user.entity';
import { ISongRepository } from '../../../domain/repositories/song.repository';
import { IUserSongRepository } from '../../../domain/repositories/user-song.repository';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { BadRequestException } from '../../../domain/shared/errors/bad-request.exception';
import { ConflictException } from '../../../domain/shared/errors/conflict.exception';
import { Url } from '../../../domain/value-objects/url.value-object';
import { TInputUserSongDTO, TOutputUserSongDTO } from '../../dto/user-song.dto';
import { mapOutput } from './map';

/**
 * Use case responsible for adding a song to a user's library.
 */
export class AddUserSongUsecase {
  /**
   * Constructor for AddUserSongUsecase.
   * @param userSongRepository Repository for user-song relations.
   * @param songRepository Repository for songs.
   * @param userRepository Repository for users.
   */
  constructor(
    private readonly userSongRepository: IUserSongRepository,
    private readonly songRepository: ISongRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Executes the use case to add a song to the user's library.
   * @param data The input data for adding the user song.
   * @returns The output data after adding the user song.
   * @throws BadRequestException if input data is invalid.
   * @throws ConflictException if the user already has the song in their library.
   */
  async execute(data: TInputUserSongDTO): Promise<TOutputUserSongDTO> {
    const url = Url.create({ url: data.url });
    if (url.isFailure) {
      throw new BadRequestException(JSON.stringify(url.getErrorValue()));
    }
    const originalUrl = Url.create({ url: data.original_url });
    if (originalUrl.isFailure) {
      throw new BadRequestException(
        JSON.stringify(originalUrl.getErrorValue()),
      );
    }
    const user = await this.userRepository.findById(data.user_id);
    const song = await this.findOrCreateSong(
      originalUrl.getValue(),
      url.getValue(),
      data.customName,
    );

    await this.checkForExistingUserSong(user, song);

    const photo = Url.create({ url: data.photo });
    if (photo.isFailure)
      throw new BadRequestException(JSON.stringify(photo.getErrorValue()));

    const userSong = UserSong.create({
      ...data,
      user,
      song,
      photo: photo.getValue(),
    });

    const newUserSong = await this.userSongRepository.create(
      userSong.getValue(),
    );
    return mapOutput(newUserSong);
  }

  /**
   * Checks if the user already has the given song in their library.
   * @param user The user entity.
   * @param song The song entity.
   * @throws ConflictException if the user already has the song.
   */
  private async checkForExistingUserSong(
    user: User,
    song: Song,
  ): Promise<void> {
    const userSongAlreadyExists =
      await this.userSongRepository.findByUserAndSong(user, song);
    if (userSongAlreadyExists) {
      throw new ConflictException('USER_ALREADY_HAS_THIS_SONG');
    }
  }

  /**
   * Finds or creates a song based on the provided URL and custom name.
   * @param url The URL of the song.
   * @param customName The custom name of the song.
   * @returns The found or created song entity.
   * @throws BadRequestException if song creation fails.
   */
  private async findOrCreateSong(
    originalUrl: Url,
    url: Url,
    customName: string,
  ) {
    const song = await this.songRepository.findByUrl(originalUrl);
    if (song) return song;

    const newSong = Song.create({
      originalUrl,
      url,
      title: customName,
    });
    if (newSong.isFailure)
      throw new BadRequestException(JSON.stringify(newSong.getErrorValue()));

    return newSong.getValue();
  }
}
