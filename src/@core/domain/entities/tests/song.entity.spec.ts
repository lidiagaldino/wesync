import { Song, TSongProps } from '../song.entity';
import { Url } from '../../value-objects/url.value-object';

describe('Song', () => {
  describe('create', () => {
    it('should create a valid Song instance', () => {
      // Arrange
      const props: TSongProps = {
        title: 'Test Song',
        url: Url.create({ url: 'https://example.com/song.mp3' }).getValue(),
      };

      // Act
      const result = Song.create(props);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(result.getValue()).toBeInstanceOf(Song);
    });

    it('should fail to create a Song instance with missing title', () => {
      // Arrange
      const props: TSongProps = {
        title: null, // Missing title
        url: Url.create({ url: 'https://example.com/song.mp3' }).getValue(),
      };

      // Act
      const result = Song.create(props);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('title is null or undefined');
    });

    it('should fail to create a Song instance with missing URL', () => {
      // Arrange
      const props: TSongProps = {
        title: 'Test Song',
        url: null, // Missing URL
      };

      // Act
      const result = Song.create(props);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('url is null or undefined');
    });
  });

  describe('getId', () => {
    it('should return the ID of the Song', () => {
      // Arrange
      const song = Song.create({
        title: 'Test Song',
        url: Url.create({ url: 'https://example.com/song.mp3' }).getValue(),
      }).getValue();
      song.setId(1);

      // Act
      const id = song.getId();

      // Assert
      expect(id).toBe(1);
    });
  });
});
