import { Logger } from '@nestjs/common';
import { Answers } from 'inquirer';
import { URL_NAME_MSG, IdAnswerDTO, URL_MSG } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import { NameUrlDTO } from '../../../common/dto';
import { isValidNameFormat, isValidUrlFormat } from '../../../utils/array';
import {
  convertStringToNameUrlArray,
  isValidNameUrlArray,
} from '../../../utils/array/name-url-array.utils';

const logger = new Logger('NameUrlValidation');

export async function validateNameUrlDTO(
  val: string,
): Promise<boolean | string> {
  try {
    const nameUrlDTO: NameUrlDTO = convertStringToNameUrlDTO(val);
    const dto = new NameUrlDTO(nameUrlDTO.name, nameUrlDTO.url);
    const errorMessage = await validateDto(dto);
    return errorMessage ?? true;
  } catch (error: any) {
    logger.error(error);
    return false;
  }
}

export function isValidNameUrl(val: string): boolean {
  try {
    const nameUrlDTO: NameUrlDTO = convertStringToNameUrlDTO(val);
    const isValidName = isValidNameFormat(nameUrlDTO.name);
    const isValidUrl = isValidUrlFormat(nameUrlDTO.url);

    return isValidName && isValidUrl;
  } catch (error: any) {
    logger.error(error);
    return false;
  }
}

export function validateNameUrl(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidNameUrl(val.trim())) {
      return true;
    } else {
      return URL_NAME_MSG.errorMessage;
    }
  } else {
    return URL_NAME_MSG.requiredMessage;
  }
}

export function isValidNameUrls(val: string): boolean {
  try {
    const nameUrlDTOs: NameUrlDTO[] = convertStringToNameUrlArray(val);
    return isValidNameUrlArray(nameUrlDTOs);
  } catch (error: any) {
    logger.error(error);
    return false;
  }
}

export function convertStringToNameUrlDTO(input: string): NameUrlDTO {
  // Check for JSON format input
  try {
    const parsedInput = JSON.parse(input);
    if (parsedInput.name && parsedInput.url) {
      // JSON format input
      if (!isValidNameFormat(parsedInput.name)) {
        throw new Error('Invalid name format');
      }

      if (!isValidUrlFormat(parsedInput.url)) {
        throw new Error('Invalid url format');
      }

      const nameUrlDTO: NameUrlDTO = {
        name: parsedInput.name,
        url: parsedInput.url,
      };
      return nameUrlDTO;
    }
  } catch (error) {
    // Error parsing JSON format input
    // Fall through to the other format handling
  }

  // Handle the other format
  const parts = input.trim().split('/');
  if (parts.length !== 2) {
    throw new Error('Invalid input format');
  }

  const [name, url] = parts;

  if (!isValidNameFormat(name)) {
    throw new Error('Invalid name format');
  }

  if (!isValidUrlFormat(url)) {
    throw new Error('Invalid url format');
  }

  const nameUrlDTO: NameUrlDTO = {
    name: name,
    url: url,
  };

  return nameUrlDTO;
}
