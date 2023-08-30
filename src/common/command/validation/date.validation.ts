import { Answers } from 'inquirer';
// import { DATE_MSG, DateAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';
import { DATE_MSG, DateAnswerDTO } from '../dto/date-answer.dto';
import { Logger } from '@nestjs/common';
import { VALID_DATE_REGEXP } from '../../../common/constant';

const logger = new Logger('DateValidation');

export const startDateMessage: Answers = {
  requiredMessage: 'Please enter a start date',
  invalidMessage: 'Please enter a valid start date',
  errorMessage:
    'Please enter a valid start date format (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid start ate string)',
};

export const endDateMessage: Answers = {
  requiredMessage: 'Please enter a end date',
  invalidMessage: 'Please enter a valid end date',
  errorMessage:
    'Please enter a valid end date format (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid end ate string)',
};

export const createdAtMessage: Answers = {
  requiredMessage: 'Please enter a created date',
  invalidMessage: 'Please enter a valid created date',
  errorMessage:
    'Please enter a valid created date format (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid created ate string)',
};

export const startedAtMessage: Answers = {
  requiredMessage: 'Please enter a started date',
  invalidMessage: 'Please enter a valid started date',
  errorMessage:
    'Please enter a valid started date format (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid started ate string)',
};

export const updatedAtMessage: Answers = {
  requiredMessage: 'Please enter a updated date',
  invalidMessage: 'Please enter a valid updated date',
  errorMessage:
    'Please enter a valid updated date format (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid updated ate string)',
};

export const completedAtMessage: Answers = {
  requiredMessage: 'Please enter a completed date',
  invalidMessage: 'Please enter a valid completed date',
  errorMessage:
    'Please enter a valid completed date format (YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid completed ate string)',
};

export async function validateDateDTO(val: Date): Promise<boolean | string> {
  const dto = new DateAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidDate(date: string): boolean {
  const dateRegex = DATE_MSG.regexp;
  return dateRegex.test(date);
}

export function validateDate(
  val: string | Date,
  answers?: Answers,
  message: Answers = DATE_MSG,
  undefinedAllowed = false,
): boolean | string {
  if (!val && !undefinedAllowed) {
    return message?.requiredMessage ?? DATE_MSG.requiredMessage;
  } else if (!val && undefinedAllowed) {
    return true;
  }

  if (val instanceof Date && isNaN(val.getTime())) {
    return message?.invalidMessage ?? DATE_MSG.invalidMessage;
  }

  if (typeof val === 'string') {
    if (!VALID_DATE_REGEXP.some((format) => format.test(val))) {
      return message?.errorMessage ?? DATE_MSG.errorMessage;
    }

    const parsedDate = new Date(val);
    if (isNaN(parsedDate.getTime())) {
      return message?.errorMessage ?? DATE_MSG.errorMessage;
    }
  }

  return true;
}

export function validateStartDate(
  val: string | Date,
  answers?: Answers,
): boolean | string {
  return validateDate(val, answers, startDateMessage, true);
}

export function validateEndDate(
  val: string | Date,
  answers?: Answers,
): boolean | string {
  return validateDate(val, answers, endDateMessage, true);
}

export function validateCreatedAt(
  val: string | Date,
  answers?: Answers,
): boolean | string {
  return validateDate(val, answers, createdAtMessage);
}

export function validateStartedAt(
  val: string | Date,
  answers?: Answers,
): boolean | string {
  return validateDate(val, answers, startedAtMessage, true);
}

export function validateUpdatedAt(
  val: string | Date,
  answers?: Answers,
): boolean | string {
  return validateDate(val, answers, updatedAtMessage);
}

export function validateCompletedAt(
  val: string | Date,
  answers?: Answers,
): boolean | string {
  return validateDate(val, answers, completedAtMessage, true);
}
