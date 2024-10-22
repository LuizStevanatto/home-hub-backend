import { HttpException, HttpStatus } from '@nestjs/common';

export class UserException extends HttpException {
  constructor(message: string) {
    message = 'Error during user operation';
    super(message, HttpStatus.BAD_REQUEST);
  }
}
