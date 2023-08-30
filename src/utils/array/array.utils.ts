import { Logger } from '@nestjs/common';
import { IdUuidDTO, IdUuidStatusDTO } from '../../common/dto';
import {
  GENERAL_STATUS_TYPE_ARRAY,
  GENERAL_URL_TYPE_ARRAY,
  VALID_ID_REGEXP,
  VALID_URL_REGEXP,
  VALID_UUID_REGEXP,
} from '../../common/constant';
import {} from 'src/common/constant/url.constant';

const logger: Logger = new Logger('ArrayUtils');

// Add your custom field validation functions here
export function isValidIDFormat(id: string): boolean {
  if (!VALID_ID_REGEXP.some((format) => format.test(id))) {
    return false;
  }
  return true;
}

export function isValidUUIDFormat(uuid: string): boolean {
  return VALID_UUID_REGEXP.test(uuid);
}

export function isValidStatusFormat(status: string): boolean {
  return GENERAL_STATUS_TYPE_ARRAY.includes(status);
}

export function isValidNameFormat(name: string): boolean {
  return GENERAL_URL_TYPE_ARRAY.includes(name);
}

export function isValidUrlFormat(url: string): boolean {
  return VALID_URL_REGEXP.test(url);
}

export interface FieldValidator {
  validate: (value: string) => boolean;
  errorMessage: string;
}

export const defaultIdValidator: FieldValidator = {
  validate: (value) => isValidIDFormat(value),
  errorMessage: 'Input array has invalid ID format',
};

export const defaultUuidValidator: FieldValidator = {
  validate: (value) => isValidUUIDFormat(value),
  errorMessage: 'Input array has invalid UUID format',
};

export const defaultStatusValidator: FieldValidator = {
  validate: (value) => isValidStatusFormat(value),
  errorMessage: 'Input array has invalid status format',
};

export const defaultNameValidator: FieldValidator = {
  validate: (value) => isValidNameFormat(value),
  errorMessage: 'Input array has invalid name format',
};

export const defaultUrlValidator: FieldValidator = {
  validate: (value) => isValidUrlFormat(value),
  errorMessage: 'Input array has invalid URL format',
};
