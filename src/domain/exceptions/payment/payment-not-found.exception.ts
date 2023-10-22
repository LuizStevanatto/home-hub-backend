import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentNotFoundException extends HttpException {
  constructor() {
    super('Property not found!', HttpStatus.NOT_FOUND);
  }
}
