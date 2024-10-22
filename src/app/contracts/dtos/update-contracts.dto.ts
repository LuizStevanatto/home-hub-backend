import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contracts.dto';

export class UpdateContractDto extends PartialType(CreateContractDto) {}
