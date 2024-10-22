import { HttpException, HttpStatus } from '@nestjs/common';

export class ContractsException extends HttpException {
  constructor(message: string) {
    message = 'Error during contracts operation';
    super(message, HttpStatus.BAD_REQUEST);
  }
}
