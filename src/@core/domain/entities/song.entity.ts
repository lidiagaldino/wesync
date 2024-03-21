import { Guard } from "../shared/core/guard/guard.core";
import { Result } from "../shared/core/result/result.core";
import { Url } from "../value-objects/url.value-object"

export type TSongProps = {
  title: string
  artist?: string // TODO: create artist entity
  url: Url;
  photo: Url;
  style: string; //TODO: create style entity
  isPublic: boolean;
}

/**
 * Represents a Song entity.
 */
export class Song {
  id: number;
  props: TSongProps;

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
      { argument: props.photo, argumentName: 'photo' },
      { argument: props.style, argumentName: 'style' },
      { argument: props.isPublic, argumentName: 'isPublic' },
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
   * Gets the artist of the Song.
   * @returns The artist of the Song.
   */
  getArtist() {
    return this.props.artist;
  }

  /**
   * Gets the URL of the Song.
   * @returns The URL of the Song.
   */
  getUrl() {
    return this.props.url;
  }

  /**
   * Gets the photo URL of the Song.
   * @returns The photo URL of the Song.
   */
  getPhoto() {
    return this.props.photo;
  }

  /**
   * Gets the style of the Song.
   * @returns The style of the Song.
   */
  getStyle() {
    return this.props.style;
  }

  /**
   * Checks if the Song is public.
   * @returns True if the Song is public, false otherwise.
   */
  getIsPublic() {
    return this.props.isPublic;
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
   * Sets the artist of the Song.
   * @param artist - The artist to set.
   */
  setArtist(artist: string) {
    this.props.artist = artist;
  }

  /**
   * Sets the URL of the Song.
   * @param url - The URL to set.
   */
  setUrl(url: Url) {
    this.props.url = url;
  }

  /**
   * Sets the photo URL of the Song.
   * @param photo - The photo URL to set.
   */
  setPhoto(photo: Url) {
    this.props.photo = photo;
  }

  /**
   * Sets the style of the Song.
   * @param style - The style to set.
   */
  setStyle(style: string) {
    this.props.style = style;
  }

  /**
   * Sets whether the Song is public or not.
   * @param isPublic - True if the Song is public, false otherwise.
   */
  setIsPublic(isPublic: boolean) {
    this.props.isPublic = isPublic;
  }
}
