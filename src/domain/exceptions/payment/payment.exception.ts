import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentException extends HttpException {
  constructor(message: string) {
    message = 'Error during payment operation';
    super(message, HttpStatus.BAD_REQUEST);
  }
}
