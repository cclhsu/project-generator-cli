import { Logger } from '@nestjs/common';
import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { IdUuidStatusDTO } from '../../common/dto/id-uuid-status.dto';

const logger = new Logger('IsArrayOfIdUuidStatusDTO');

@ValidatorConstraint({ name: 'IsArrayOfIdUuidStatusDTO', async: false })
export class IsArrayOfIdUuidStatusDTO implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!Array.isArray(value)) {
      return false;
    }

    for (const item of value) {
      if (
        typeof item !== 'object' ||
        !item.hasOwnProperty('ID') ||
        !item.hasOwnProperty('UUID') ||
        !item.hasOwnProperty('status')
      ) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Property ${args.property} should be an array of IdUuidStatusDTO objects`;
  }
}
