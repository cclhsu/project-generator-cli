import { Logger } from '@nestjs/common';
import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { IdUuidDTO } from '../../common/dto/id-uuid.dto';

const logger = new Logger('IsArrayOfIdUuidDTO');

@ValidatorConstraint({ name: 'IsArrayOfIdUuidDTO', async: false })
export class IsArrayOfIdUuidDTO implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!Array.isArray(value)) {
      return false;
    }

    for (const item of value) {
      if (
        typeof item !== 'object' ||
        !item.hasOwnProperty('ID') ||
        !item.hasOwnProperty('UUID')
      ) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Property ${args.property} should be an array of IdUuidDTO objects`;
  }
}
