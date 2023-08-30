// import { Logger } from '@nestjs/common';
import { Answers } from 'inquirer';
import {
  ACCEPTANCE_CRITERION_MSG,
  AcceptanceCriterionStringAnswerDTO,
} from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

// const logger = new Logger('validateAcceptanceCriterionDTO');

export async function validateAcceptanceCriterionDTO(
  val: string,
): Promise<boolean | string> {
  // logger.verbose(`val: ${val}`);
  const dto = new AcceptanceCriterionStringAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  // logger.verbose(`errorMessage: ${errorMessage}`);
  return errorMessage ?? true;
}

export function isValidAcceptanceCriterion(
  acceptanceCriterion: string,
): boolean {
  const acceptanceCriterionRegex = ACCEPTANCE_CRITERION_MSG.regexp;
  return acceptanceCriterionRegex.test(acceptanceCriterion);
}

export function validateAcceptanceCriterion(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidAcceptanceCriterion(val)) {
      return true;
    } else {
      return ACCEPTANCE_CRITERION_MSG.errorMessage;
    }
  } else {
    return ACCEPTANCE_CRITERION_MSG.requiredMessage;
  }
}
