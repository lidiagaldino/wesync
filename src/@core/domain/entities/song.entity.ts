import { Guard } from '../shared/core/guard/guard.core';
import { Result } from '../shared/core/result/result.core';
import { Url } from '../value-objects/url.value-object';
import { Genre } from './genre.entity';

export type TSongProps = {
  title: string;
  url: Url;
  genre: Genre;
  duration: number;
};

/**
 * Represents a Song entity.
 */
export class Song {
  private id: number;
  private props: TSongProps;

  /**
   * Private constructor for creating a Song instance.
   * @param props - The properties of the Song.
   */
  private constructor(props: TSongProps) {
    this.props = props;
  }

  /**
   * Creates a new Song instance.
   * @param props - The properties of the Song.
   * @returns A Result object containing either the created Song instance or an error.
   */
  public static create(props: TSongProps): Result<Song> {
    const guardResults = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: 'title' },
      { argument: props.url, argumentName: 'url' },
      {
        argument: props.genre,
        argumentName: 'genre',
      },
      { argument: props.duration, argumentName: 'duration' },
    ]);

    if (guardResults.isFailure) {
      return Result.fail(guardResults.getErrorValue());
    }

    return Result.ok(new Song(props));
  }

  /**
   * Gets the ID of the Song.
   * @returns The ID of the Song.
   */
  getId() {
    return this.id;
  }

  /**
   * Gets the title of the Song.
   * @returns The title of the Song.
   */
  getTitle() {
    return this.props.title;
  }

  /**
   * Gets the URL of the Song.
   * @returns The URL of the Song.
   */
  getUrl() {
    return this.props.url;
  }

  /**
   * Gets the genre of the Song.
   * @returns The genre of the Song.
   */
  getGenre() {
    return this.props.genre;
  }

  /**
   * Gets the duration of the Song.
   * @returns The duration of the Song.
   */
  getDuration() {
    return this.props.duration;
  }

  /**
   * Sets the ID of the Song.
   * @param id - The ID to set.
   */
  setId(id: number) {
    this.id = id;
  }

  /**
   * Sets the title of the Song.
   * @param title - The title to set.
   */
  setTitle(title: string) {
    this.props.title = title;
  }

  /**
   * Sets the URL of the Song.
   * @param url - The URL to set.
   */
  setUrl(url: Url) {
    this.props.url = url;
  }

  /**
   * Sets the genre of the Song.
   * @param genre - The genre to set.
   */
  setGenre(genre: Genre) {
    this.props.genre = genre;
  }

  /**
   * Sets the duration of the song.
   * @param duration - The duration to set.
   */
  setDuration(duration: number) {
    this.props.duration = duration;
  }
}
