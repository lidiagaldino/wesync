import { Password, TPasswordProps } from '../password.value-object';

describe('Password', () => {
  describe('create', () => {
    it('should create a valid Password instance', () => {
      // Arrange
      const props: TPasswordProps = {
        password: 'strongPassword123',
      };

      // Act
      const result = Password.create(props);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(result.getValue()).toBeInstanceOf(Password);
    });

    it('should fail to create a Password instance with a short password', () => {
      // Arrange
      const props: TPasswordProps = {
        password: 'weak',
      };

      // Act
      const result = Password.create(props);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('Text is not at least 8 chars.');
    });

    it('should fail to create a Password instance with a null or undefined password', () => {
      // Arrange
      const props: TPasswordProps = {
        password: null,
      };

      // Act
      const result = Password.create(props);

      // Assert
      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('password is null or undefined');
    });
  });

  describe('getPassword', () => {
    it('should return the password value', () => {
      // Arrange
      const props: TPasswordProps = {
        password: 'strongPassword123',
      };
      const password = Password.create(props).getValue();

      // Act
      const passwordValue = password.getPassword();

      // Assert
      expect(passwordValue).toBe(props.password);
    });
  });
});
