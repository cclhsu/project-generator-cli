// import { Logger } from '@nestjs/common';
import { Answers } from 'inquirer';
import {
  DEFINITION_OF_DONE_MSG,
  DefinitionOfDoneStringAnswerDTO,
} from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

// const logger = new Logger('validateDefinitionOfDoneDTO');

export async function validateDefinitionOfDoneDTO(
  val: string,
): Promise<boolean | string> {
  // logger.verbose(`val: ${val}`);
  const dto = new DefinitionOfDoneStringAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  // logger.verbose(`errorMessage: ${errorMessage}`);
  return errorMessage ?? true;
}

export function isValidDefinitionOfDone(definitionOfDone: string): boolean {
  const definitionOfDoneRegex = DEFINITION_OF_DONE_MSG.regexp;
  return definitionOfDoneRegex.test(definitionOfDone);
}

export function validateDefinitionOfDone(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidDefinitionOfDone(val)) {
      return true;
    } else {
      return DEFINITION_OF_DONE_MSG.errorMessage;
    }
  } else {
    return DEFINITION_OF_DONE_MSG.requiredMessage;
  }
}
