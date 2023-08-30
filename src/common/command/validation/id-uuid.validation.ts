import { Logger } from '@nestjs/common';
import { Answers } from 'inquirer';
import { ID_MSG, IdAnswerDTO, UUID_MSG } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import { IdUuidDTO } from '../../../common/dto';
import {
  convertStringToIdUuidArray,
  isValidIDFormat,
  isValidIdUuidArray,
  isValidUUIDFormat,
} from '../../../utils/array';

const logger = new Logger('IdUuidValidation');

export async function validateIdUuidDTO(
  val: string,
): Promise<boolean | string> {
  try {
    const idUuidDTO: IdUuidDTO = convertStringToIdUuidDTO(val);
    const dto = new IdUuidDTO(idUuidDTO.ID, idUuidDTO.UUID);
    const errorMessage = await validateDto(dto);
    return errorMessage ?? true;
  } catch (error: any) {
    logger.error(error);
    return false;
  }
}

export function isValidIdUuid(val: string): boolean {
  try {
    const idUuidDTO: IdUuidDTO = convertStringToIdUuidDTO(val);
    const isValidID = isValidIDFormat(idUuidDTO.ID);
    const isValidUUID = isValidUUIDFormat(idUuidDTO.UUID);

    return isValidID && isValidUUID;
  } catch (error: any) {
    logger.error(error);
    return false;
  }
}

export function validateIdUuid(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidIdUuid(val.trim())) {
      return true;
    } else {
      return ID_MSG.errorMessage;
    }
  } else {
    return ID_MSG.requiredMessage;
  }
}

export function isValidIdUuids(val: string): boolean {
  try {
    const idUuidDTOs: IdUuidDTO[] = convertStringToIdUuidArray(val);
    return isValidIdUuidArray(idUuidDTOs);
  } catch (error: any) {
    logger.error(error);
    return false;
  }
}

export function convertStringToIdUuidDTO(input: string): IdUuidDTO {
  // if (input.trim() === '' || input.trim().toLowerCase() === 'n/a') {
  //   return null;
  // }

  try {
    const parsedInput = JSON.parse(input);
    if (parsedInput.ID && parsedInput.UUID) {
      // JSON format input
      if (!isValidIDFormat(parsedInput.ID)) {
        throw new Error('Invalid ID format');
      }

      if (!isValidUUIDFormat(parsedInput.UUID)) {
        throw new Error('Invalid UUID format');
      }

      const idUuidDTO: IdUuidDTO = {
        ID: parsedInput.ID,
        UUID: parsedInput.UUID,
      };
      return idUuidDTO;
    }
  } catch (error) {
    // Fall through to the other format
  }

  // Other format
  const [ID, UUID] = input.trim().split('/');

  if (!ID || !UUID) {
    throw new Error('Invalid input format');
  }

  if (!isValidIDFormat(ID)) {
    throw new Error('Invalid ID format');
  }

  if (!isValidUUIDFormat(UUID)) {
    throw new Error('Invalid UUID format');
  }

  const idUuidDTO: IdUuidDTO = {
    ID: ID,
    UUID: UUID,
  };

  return idUuidDTO;
}
