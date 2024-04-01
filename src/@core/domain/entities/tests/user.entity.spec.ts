import { User, TUserProps } from '../user.entity';
import { Email } from '../../value-objects/email.value-object';
import { Password } from '../../value-objects/password.value-object';
import { Status } from '../../value-objects/status.value-object';
import { Url } from '../../value-objects/url.value-object';

describe('User', () => {
  let email;
  let password;
  let photo;
  let status;
  const emailValue = 'john@example.com';
  const name = 'John Doe';
  const passwordValue = 'password';
  const photoValue = 'https://example.com/photo.jpg';
  const statusValue = 'active';
  beforeEach(() => {
    jest.clearAllMocks();
    email = Email.create({ email: emailValue }).getValue();
    password = Password.create({ password: passwordValue }).getValue();
    photo = Url.create({ url: photoValue }).getValue();
    status = Status.create({ name: statusValue }).getValue();
  });
  // Test that creation of User with valid properties succeeds
  it('should create a user with valid properties', () => {
    // Arrange
    const validUserProps: TUserProps = {
      name,
      email,
      password,
      photo,
      status,
      songs: [],
    };

    // Act
    const result = User.create(validUserProps);

    // Assert
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().getName()).toBe(name);
    expect(result.getValue().getEmail().getEmail()).toBe(emailValue);
    expect(result.getValue().getPassword().getPassword()).toBe(passwordValue);
    expect(result.getValue().getPhoto().getUrl()).toBe(photoValue);
    expect(result.getValue().getStatus().getName()).toBe(statusValue);
    expect(result.getValue().getId()).toBeUndefined();
  });

  // Test that creation of User with invalid properties fails
  it('should fail to create a user with missing properties', () => {
    // Arrange
    const invalidUserProps: Partial<TUserProps> = {
      // Missing name
      email,
      password,
      photo,
      status,
      songs: [],
    };

    // Act
    const result = User.create(invalidUserProps as TUserProps);

    // Assert
    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('name is null or undefined');
  });
});
