import { PartialType } from '@nestjs/mapped-types';
import { CreateDynamicDto } from './create-dynamic.dto';

export class UpdateDynamicDto extends PartialType(CreateDynamicDto) {}
