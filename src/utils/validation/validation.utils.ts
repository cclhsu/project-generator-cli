import { Logger } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';

const logger = new Logger('ValidationService');

export async function validateDto<T extends object>(
  dto: T,
): Promise<string | null> {
  // logger.verbose(`Validating DTO: ${JSON.stringify(dto)}`);
  const errors: ValidationError[] = await validate(dto);

  if (errors.length > 0) {
    // If there are validation errors, concatenate the error messages into a single string.
    const errorMessage: string = errors
      .map((error) => Object.values(error.constraints ?? {}))
      .flat()
      .join(', ');

    // logger.verbose(`Validation error: ${errorMessage}`);
    return errorMessage;
  }
  // logger.verbose('No validation errors');
  return null; // No validation errors
}

export async function isDtoValid<T extends object>(dto: T): Promise<boolean> {
  const errors = await validate(dto);
  return errors.length === 0;
}

export async function validateDtoMetadataContent<
  T extends { metadata: any; content: any },
>(dto: T): Promise<string | null> {
  logger.verbose(`Validating DTO: ${JSON.stringify(dto, null, 2)}`);
  try {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new Error(`Validation failed! ${errors.toString()}`);
    } else {
      logger.debug('Validation succeeded');
    }

    if (dto.metadata) {
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new Error(`Validation metadata failed! ${errors.toString()}`);
      } else {
        logger.debug('Validation metadata succeeded');
      }
    } else {
      throw new Error('Metadata is missing');
    }

    if (dto.content) {
      await validate(dto.content);
      const errors = await validate(dto.content);
      if (errors.length > 0) {
        throw new Error(`Validation content failed! ${errors.toString()}`);
      } else {
        logger.debug('Validation content succeeded');
      }
    } else {
      throw new Error('Content is missing');
    }

    logger.debug('Validation succeeded');
    return null;
  } catch (errors: any) {
    // logger.error(`Validation failed: ${errors}`);
    return errors.toString();
  }
}

// async function validateDTO<T>(
//   val: string,
//   dtoConstructor: new (value: string) => T,
//   validationMessage: ValidationMessage,
// ): Promise<boolean | string> {
//   const dto = new dtoConstructor(val);
//   const errorMessage = await validateDto(dto);
//   return errorMessage ?? true;
// }

// function isValid<T>(
//   value: string,
//   validationFunction: (val: string) => boolean,
// ): boolean {
//   return validationFunction(value);
// }

// function validate<T>(
//   val: string,
//   validationFunction: (val: string) => boolean,
//   validationMessage: ValidationMessage,
// ): boolean | string {
//   if (val.trim() !== '' && val.trim() !== 'n/a') {
//     if (isValid(val, validationFunction)) {
//       return true;
//     } else {
//       return validationMessage.errorMessage;
//     }
//   } else {
//     return validationMessage.requiredMessage;
//   }
// }
