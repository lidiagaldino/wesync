import { Guard } from '../shared/core/guard/guard.core';
import { Result } from '../shared/core/result/result.core';
import { Url } from '../value-objects/url.value-object';
import { Song } from './song.entity';
import { User } from './user.entity';

export type TUserSongProps = {
  user: User;
  song: Song;
  customName: string;
  photo: Url;
  isPublic: boolean;
  isFavorite: boolean;
};

/**
 * A class that represents a user-song relationship.
 */
export class UserSong {
  id: number;
  props: TUserSongProps;

  /**
   * Creates a new user-song relationship.
   * @param props The properties of the user-song relationship.
   */
  constructor(props: TUserSongProps) {
    this.props = props;
  }

  /**
   * Creates a new user-song relationship.
   * @param props The properties of the user-song relationship.
   * @returns A Result containing the user-song relationship if successful, or an error if there was an issue.
   */
  public static create(props: TUserSongProps): Result<UserSong> {
    const guardResults = Guard.againstNullOrUndefinedBulk([
      { argument: props.user, argumentName: 'user' },
      { argument: props.song, argumentName: 'song' },
      { argument: props.customName, argumentName: 'customName' },
      { argument: props.photo, argumentName: 'photo' },
      { argument: props.isPublic, argumentName: 'isPublic' },
      { argument: props.isFavorite, argumentName: 'isFavorite' },
    ]);

    if (guardResults.isFailure) {
      return Result.fail<UserSong>(guardResults.getErrorValue());
    }

    return Result.ok<UserSong>(new UserSong(props));
  }

  /**
   * Gets the ID of the user-song relationship.
   * @returns The ID of the user-song relationship.
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Gets the user of the user-song relationship.
   * @returns The user of the user-song relationship.
   */
  public getUser(): User {
    return this.props.user;
  }

  /**
   * Gets the song of the user-song relationship.
   * @returns The song of the user-song relationship.
   */
  public getSong(): Song {
    return this.props.song;
  }

  /**
   * Gets the custom name of the user-song relationship.
   * @returns The custom name of the user-song relationship.
   */
  public getCustomName(): string {
    return this.props.customName;
  }

  /**
   * Gets the photo of the user-song relationship.
   * @returns The photo of the user-song relationship.
   */
  public getPhoto(): Url {
    return this.props.photo;
  }

  /**
   * Gets a value indicating whether the user-song relationship is public.
   * @returns `true` if the user-song relationship is public, or `false` if it is private.
   */
  public getIsPublic(): boolean {
    return this.props.isPublic;
  }

  /**
   * Gets a value indicating whether the user-song relationship is a favorite.
   * @returns `true` if the user-song relationship is a favorite, or `false` if it is not a favorite.
   */
  public getIsFavorite(): boolean {
    return this.props.isFavorite;
  }

  /**
   * Sets the ID of the user-song relationship.
   * @param id The ID of the user-song relationship.
   */
  public setId(id: number): void {
    this.id = id;
  }

  /**
   * Sets the user of the user-song relationship.
   * @param user The user of the user-song relationship.
   */
  public setUser(user: User): void {
    this.props.user = user;
  }

  /**
   * Sets the song of the user-song relationship.
   * @param song The song of the user-song relationship.
   */
  public setSong(song: Song): void {
    this.props.song = song;
  }

  /**
   * Sets the custom name of the user-song relationship.
   * @param customName The custom name of the user-song relationship.
   */
  public setCustomName(customName: string): void {
    this.props.customName = customName;
  }

  /**
   * Sets a value indicating whether the user-song relationship is public.
   * @param isPublic `true` if the user-song relationship is public, or `false` if it is private.
   */
  public setIsPublic(isPublic: boolean): void {
    this.props.isPublic = isPublic;
  }

  /**
   * Sets a value indicating whether the user-song relationship is a favorite.
   * @param isFavorite `true` if the user-song relationship is a favorite, or `false` if it is not a favorite.
   */
  public setIsFavorite(isFavorite: boolean): void {
    this.props.isFavorite = isFavorite;
  }

  /**
   * Sets the photo of the user-song relationship.
   * @param photo The photo of the user-song relationship.
   */
  public setPhoto(photo: Url): void {
    this.props.photo = photo;
  }

  /**
   * Toggles the value indicating whether the user-song relationship is a favorite.
   */
  public toggleFavorite(): void {
    this.props.isFavorite = !this.props.isFavorite;
  }

  /**
   * Toggles the value indicating whether the user-song relationship is public.
   */
  public togglePublic(): void {
    this.props.isPublic = !this.props.isPublic;
  }
}
