import { HttpException, HttpStatus } from '@nestjs/common';

export class PropertyException extends HttpException {
  constructor(message: string) {
    message = 'Error during property operation';
    super(message, HttpStatus.BAD_REQUEST);
  }
}
