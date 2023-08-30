import { Answers } from 'inquirer';
import { UUID_MSG, UuidAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateUuidDTO(val: string): Promise<boolean | string> {
  const dto = new UuidAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidUuid(UUID: string): boolean {
  const UUIDRegex = UUID_MSG.regexp;
  return UUIDRegex.test(UUID);
}

export function validateUuid(val: string, answers?: Answers): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidUuid(val)) {
      return true;
    } else {
      return UUID_MSG.errorMessage;
    }
  } else {
    return UUID_MSG.requiredMessage;
  }
}

export function isValidUuids(UUIDs: string[]): boolean {
  return UUIDs.every((UUID) => isValidUuid(UUID));
}
