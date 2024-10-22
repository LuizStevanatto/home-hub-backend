import { HttpException, HttpStatus } from '@nestjs/common';

export class ContractsNotFoundException extends HttpException {
  constructor() {
    super('Contracts not found!', HttpStatus.NOT_FOUND);
  }
}
