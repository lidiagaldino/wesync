import { Status, TStatusProps } from '../status.value-object';

describe('Status', () => {
  describe('create', () => {
    it('should create a valid Status instance', () => {
      // Arrange
      const props: TStatusProps = {
        name: 'active',
      };

      // Act
      const result = Status.create(props);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(result.getValue()).toBeInstanceOf(Status);
    });

    it('should fail to create a Status instance with a null or undefined name', () => {
      // Arrange
      const props: TStatusProps = {
        name: null,
      };

      // Act
      const result = Status.create(props);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('name is null or undefined');
    });
  });

  describe('getName', () => {
    it('should return the status name', () => {
      // Arrange
      const props: TStatusProps = {
        name: 'active',
      };
      const status = Status.create(props).getValue();

      // Act
      const name = status.getName();

      // Assert
      expect(name).toBe(props.name);
    });
  });
});
