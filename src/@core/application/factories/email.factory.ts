import { left } from '../../domain/shared/core/result/left.core';
import { Response } from '../../domain/shared/core/result/response.core';
import { right } from '../../domain/shared/core/result/right.core';
import { Email } from '../../domain/value-objects/email.value-object';

/**
 * Creates a new instance of `Email` from the provided value.
 *
 * @param {string} value - The email address to be validated and used for creating the `Email` instance.
 *
 * @returns {Response<Email>} A `Response` object containing either a `left` error if the email is invalid, or a `right` success containing the newly created `Email` instance.
 */
export function emailFactory(value: string): Response<Email> {
  const email = Email.create({ email: value });
  if (email.isFailure) {
    return left(email);
  }

  return right(email);
}
