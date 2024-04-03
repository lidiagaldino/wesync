/* eslint-disable @typescript-eslint/no-unused-vars */
import { Genre } from '../../../../domain/entities/genre.entity';
import { Song } from '../../../../domain/entities/song.entity';
import { UserSong } from '../../../../domain/entities/user-song.entity';
import { User } from '../../../../domain/entities/user.entity';
import { ISongRepository } from '../../../../domain/repositories/song.repository';
import { IUserSongRepository } from '../../../../domain/repositories/user-song.repository';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { BadRequestException } from '../../../../domain/shared/errors/bad-request.exception';
import { ConflictException } from '../../../../domain/shared/errors/conflict.exception';
import { Email } from '../../../../domain/value-objects/email.value-object';
import { Password } from '../../../../domain/value-objects/password.value-object';
import { Status } from '../../../../domain/value-objects/status.value-object';
import { Url } from '../../../../domain/value-objects/url.value-object';
import { TInputUserSongDTO } from '../../../dto/user-song.dto';
import { AddUserSongUsecase } from '../add-user-song.usecase';

// Mock implementations for repositories
const mockUserSongRepository: IUserSongRepository = {
  async findByUserAndSong(user: User, song: Song) {
    return song.getUrl().getUrl() == 'https://example.com/existing-song.mp3'
      ? UserSong.create({
          user,
          song,
          customName: 'as',
          isFavorite: true,
          isPublic: true,
          photo: Url.create({ url: 'https://example.com' }).getValue(),
        }).getValue()
      : null;
  },
  async create(userSong: UserSong): Promise<UserSong> {
    userSong.setId(1);
    return userSong;
  },
  update: function (userSong: UserSong): Promise<UserSong> {
    throw new Error('Function not implemented.');
  },
  delete: function (userSong: UserSong): Promise<void> {
    throw new Error('Function not implemented.');
  },
  findById: function (id: number): Promise<UserSong> {
    throw new Error('Function not implemented.');
  },
  findByUser: function (user: User): Promise<UserSong[]> {
    throw new Error('Function not implemented.');
  },
  findBySong: function (song: Song): Promise<UserSong[]> {
    throw new Error('Function not implemented.');
  },
  findAll: function (): Promise<UserSong[]> {
    throw new Error('Function not implemented.');
  },
};

const mockSongRepository: ISongRepository = {
  async findByUrl(url: Url) {
    return url.getUrl() === 'https://example.com/existing-song.mp3'
      ? Song.create({
          title: 'Existing song',
          url,
        }).getValue()
      : null;
  },
  create: function (song: Song): Promise<Song> {
    throw new Error('Function not implemented.');
  },
  update: function (song: Song): Promise<Song> {
    throw new Error('Function not implemented.');
  },
  delete: function (song: Song): Promise<void> {
    throw new Error('Function not implemented.');
  },
  findById: function (id: number): Promise<Song> {
    throw new Error('Function not implemented.');
  },
  findAll: function (): Promise<Song[]> {
    throw new Error('Function not implemented.');
  },
  findByGenre: function (genre: Genre): Promise<Song[]> {
    throw new Error('Function not implemented.');
  },
};

const mockUserRepository: IUserRepository = {
  async findById() {
    const email = Email.create({ email: 'foo@example.com' }).getValue();
    const password = Password.create({ password: '<PASSWORD>' }).getValue();
    const photo = Url.create({
      url: 'https://example.com/photo.jpg',
    }).getValue();
    const status = Status.create({ name: 'active' }).getValue();
    const user = User.create({
      email,
      name: 'John Doe',
      password,
      photo,
      songs: [],
      status,
    }).getValue();
    user.setId(1);
    return user;
  },
  create: function (user: User): Promise<User> {
    throw new Error('Function not implemented.');
  },
  update: function (user: User): Promise<User> {
    throw new Error('Function not implemented.');
  },
  changePassword: function (newPassword: Password, user: User): Promise<User> {
    throw new Error('Function not implemented.');
  },
  delete: function (user: User): Promise<void> {
    throw new Error('Function not implemented.');
  },
  findByEmail: function (email: Email): Promise<User> {
    throw new Error('Function not implemented.');
  },
  findAll: function (): Promise<User[]> {
    throw new Error('Function not implemented.');
  },
};

describe('AddUserSongUsecase', () => {
  it('should add a new user song', async () => {
    const usecase = new AddUserSongUsecase(
      mockUserSongRepository,
      mockSongRepository,
      mockUserRepository,
    );

    const input: TInputUserSongDTO = {
      user_id: 1,
      url: 'https://example.com/new-song.mp3',
      customName: 'New Song',
      photo: 'https://example.com/photo.jpg',
      isPublic: true,
      isFavorite: true,
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual({ id: 1, ...input });
    // Add more assertions as needed
  });

  it('should throw BadRequestException if URL is invalid', async () => {
    const usecase = new AddUserSongUsecase(
      mockUserSongRepository,
      mockSongRepository,
      mockUserRepository,
    );

    const input: TInputUserSongDTO = {
      user_id: 1,
      url: 'invalid-url',
      customName: 'My Favorite Song',
      photo: 'https://example.com/photo.jpg',
      isPublic: true,
      isFavorite: true,
    };

    await expect(usecase.execute(input)).rejects.toThrow();
  });

  it('should throw BadRequestException if photo URL is invalid', async () => {
    const usecase = new AddUserSongUsecase(
      mockUserSongRepository,
      mockSongRepository,
      mockUserRepository,
    );

    const input: TInputUserSongDTO = {
      user_id: 1,
      url: 'https://example.com/song.mp3',
      customName: 'My Favorite Song',
      photo: 'invalid-photo-url',
      isPublic: true,
      isFavorite: true,
    };

    await expect(usecase.execute(input)).rejects.toThrow();
  });

  it('should throw ConflictException if user already has the song', async () => {
    const usecase = new AddUserSongUsecase(
      mockUserSongRepository,
      mockSongRepository,
      mockUserRepository,
    );

    const input: TInputUserSongDTO = {
      user_id: 1,
      url: 'https://example.com/existing-song.mp3', // Existing song URL
      customName: 'Existing Song',
      photo: 'https://example.com/photo.jpg',
      isPublic: true,
      isFavorite: true,
    };

    await expect(usecase.execute(input)).rejects.toThrow();
  });

  // Add more test cases for other scenarios (e.g., conflict, missing user, etc.)
});
