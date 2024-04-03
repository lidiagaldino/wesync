import { Url, TUrlProps } from '../url.value-object';

describe('Url', () => {
  describe('create', () => {
    it('should create a valid Url instance', () => {
      // Arrange
      const props: TUrlProps = {
        url: 'https://example.com',
      };

      // Act
      const result = Url.create(props);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(result.getValue()).toBeInstanceOf(Url);
    });

    it('should fail to create an invalid Url instance', () => {
      // Arrange
      const props: TUrlProps = {
        url: 'invalid-url',
      };

      // Act
      const result = Url.create(props);

      // Assert
      expect(result.isFailure).toBe(true);
    });
  });

  describe('isUrlValid', () => {
    it('should return true for a valid URL', () => {
      // Arrange
      const validUrl = 'https://example.com';

      // Act
      const isValid = Url.isUrlValid(validUrl);

      // Assert
      expect(isValid).toBe(true);
    });

    it('should return false for an invalid URL', () => {
      // Arrange
      const invalidUrl = 'invalid-url';

      // Act
      const isValid = Url.isUrlValid(invalidUrl);

      // Assert
      expect(isValid).toBe(false);
    });
  });

  describe('getUrl', () => {
    it('should return the URL of the Url instance', () => {
      // Arrange
      const props: TUrlProps = {
        url: 'https://example.com',
      };
      const url = Url.create(props).getValue();

      // Act
      const urlValue = url.getUrl();

      // Assert
      expect(urlValue).toBe(props.url);
    });
  });
});
