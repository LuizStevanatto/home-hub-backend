import { HttpException, HttpStatus } from '@nestjs/common';

export class PropertyNotFoundException extends HttpException {
  constructor() {
    super('Property not found!', HttpStatus.NOT_FOUND);
  }
}
