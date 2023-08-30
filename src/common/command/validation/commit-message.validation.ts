import { Answers } from 'inquirer';
import { COMMIT_MSG_MSG, CommitMessageAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateCommitMessageDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new CommitMessageAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidCommitMsg(CommitMessage: string): boolean {
  const commitMessageRegex = COMMIT_MSG_MSG.regexp;
  return commitMessageRegex.test(CommitMessage);
}

export function validateCommitMsg(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidCommitMsg(val)) {
      return true;
    } else {
      return COMMIT_MSG_MSG.errorMessage;
    }
  } else {
    return COMMIT_MSG_MSG.requiredMessage;
  }
}
