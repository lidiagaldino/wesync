import { Email, TEmailProps } from '../email.value-object';

describe('Email', () => {
  describe('create', () => {
    it('should create a valid Email instance', () => {
      // Arrange
      const props: TEmailProps = {
        email: 'test@example.com',
      };

      // Act
      const result = Email.create(props);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(result.getValue()).toBeInstanceOf(Email);
    });

    it('should fail to create an invalid Email instance', () => {
      // Arrange
      const props: TEmailProps = {
        email: 'invalid-email',
      };

      // Act
      const result = Email.create(props);

      // Assert
      expect(result.isFailure).toBe(true);
    });
  });

  describe('isEmailValid', () => {
    it('should return true for a valid email', () => {
      // Arrange
      const validEmail = 'test@example.com';

      // Act
      const isValid = Email.isEmailValid(validEmail);

      // Assert
      expect(isValid).toBe(true);
    });

    it('should return false for an invalid email', () => {
      // Arrange
      const invalidEmail = 'invalid-email';

      // Act
      const isValid = Email.isEmailValid(invalidEmail);

      // Assert
      expect(isValid).toBe(false);
    });
  });

  describe('getEmail', () => {
    it('should return the email value', () => {
      // Arrange
      const props: TEmailProps = {
        email: 'test@example.com',
      };
      const email = Email.create(props).getValue();

      // Act
      const emailValue = email.getEmail();

      // Assert
      expect(emailValue).toBe(props.email);
    });
  });
});
