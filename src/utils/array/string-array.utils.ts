import { Logger } from '@nestjs/common';
import { IdUuidDTO, IdUuidStatusDTO } from '../../common/dto';
import {
  VALID_ID_REGEXP,
  VALID_UUID_REGEXP,
  GENERAL_STATUS_TYPE_ARRAY,
} from '../../common/constant';

const logger: Logger = new Logger('ArrayUtils');

export function convertStringToArray(val: string, separator = ';'): string[] {
  if (val.trim() === '' || val.trim().toLowerCase() === 'n/a') {
    return [];
  }

  try {
    const items: string[] = JSON.parse(val);
    if (Array.isArray(items)) {
      return items;
    }
  } catch (error: any) {
    const items: string[] = val.split(separator).map((item) => item.trim());
    return items;
  }

  throw new Error('Invalid input format for definition of done.');
}
