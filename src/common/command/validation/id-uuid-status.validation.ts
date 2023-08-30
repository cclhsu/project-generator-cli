import { Logger } from '@nestjs/common';
import { Answers } from 'inquirer';
import { ID_MSG, IdAnswerDTO, UUID_MSG } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import { IdUuidStatusDTO } from '../../dto';
import {
  GENERAL_STATUS_TYPES,
  GENERAL_STATUS_TYPE_ARRAY,
  convertStringToGeneralStatus,
} from '../../../common/constant';
import {
  convertStringToIdUuidStatusArray,
  isValidIDFormat,
  isValidIdUuidStatusArray,
  isValidUUIDFormat,
} from '../../../utils/array';

const logger = new Logger('IdUuidStatusValidation');

export async function validateIdUuidStatusDTO(
  val: string,
): Promise<boolean | string> {
  try {
    const idUuidStatusDTO: IdUuidStatusDTO =
      convertStringToIdUuidStatusDTO(val);
    const dto = new IdUuidStatusDTO(
      idUuidStatusDTO.ID,
      idUuidStatusDTO.UUID,
      idUuidStatusDTO.status,
    );
    const errorMessage = await validateDto(dto);
    return errorMessage ?? true;
  } catch (error: any) {
    logger.error(error);
    return false;
  }
}

export function isValidIdUuidStatus(val: string): boolean {
  try {
    const idUuidStatusDTO: IdUuidStatusDTO =
      convertStringToIdUuidStatusDTO(val);
    const isValidID = isValidIDFormat(idUuidStatusDTO.ID);
    const isValidUUID = isValidUUIDFormat(idUuidStatusDTO.UUID);
    const isValidStatus = GENERAL_STATUS_TYPE_ARRAY.includes(
      idUuidStatusDTO.status,
    );
    return isValidID && isValidUUID && isValidStatus;
  } catch (error: any) {
    logger.error(error);
    return false;
  }
}

export function validateIdUuidStatus(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidIdUuidStatus(val.trim())) {
      return true;
    } else {
      return ID_MSG.errorMessage;
    }
  } else {
    return ID_MSG.requiredMessage;
  }
}

export function isValidIdUuidStatuses(val: string): boolean {
  try {
    const IdUuidStatusDTOs: IdUuidStatusDTO[] =
      convertStringToIdUuidStatusArray(val);
    return isValidIdUuidStatusArray(IdUuidStatusDTOs);
  } catch (error: any) {
    logger.error(error);
    return false;
  }
}

export function convertStringToIdUuidStatusDTO(input: string): IdUuidStatusDTO {
  // if (input.trim() === '' || input.trim().toLowerCase() === 'n/a') {
  //   return null;
  // }

  try {
    const parsedInput = JSON.parse(input);
    if (parsedInput.ID && parsedInput.UUID && parsedInput.status) {
      // JSON format input
      if (!isValidIDFormat(parsedInput.ID)) {
        throw new Error('Invalid ID format');
      }

      if (!isValidUUIDFormat(parsedInput.UUID)) {
        throw new Error('Invalid UUID format');
      }

      if (!GENERAL_STATUS_TYPE_ARRAY.includes(parsedInput.status)) {
        throw new Error('Invalid status format');
      }

      const IdUuidStatusDTO: IdUuidStatusDTO = {
        ID: parsedInput.ID,
        UUID: parsedInput.UUID,
        status: convertStringToGeneralStatus(parsedInput.status),
      };

      return IdUuidStatusDTO;
    }
  } catch (error) {
    // Fall through to the other format
  }

  // Other format
  const [ID, UUID, status] = input.trim().split('/');

  if (!ID || !UUID || !status) {
    throw new Error('Invalid input format');
  }

  if (!isValidIDFormat(ID)) {
    throw new Error('Invalid ID format');
  }

  if (!isValidUUIDFormat(UUID)) {
    throw new Error('Invalid UUID format');
  }

  if (!GENERAL_STATUS_TYPE_ARRAY.includes(status)) {
    throw new Error('Invalid status format');
  }

  const IdUuidStatusDTO: IdUuidStatusDTO = {
    ID: ID,
    UUID: UUID,
    status: convertStringToGeneralStatus(status),
  };

  return IdUuidStatusDTO;
}
