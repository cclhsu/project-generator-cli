import { Answers } from 'inquirer';
import { TEAM_NAME_MSG, TeamNameAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateTeamNameDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new TeamNameAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTeamName(teamName: string): boolean {
  const teamNameRegex = TEAM_NAME_MSG.regexp;
  return teamNameRegex.test(teamName);
}

export function validateTeamName(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTeamName(val)) {
      return true;
    } else {
      return TEAM_NAME_MSG.errorMessage;
    }
  } else {
    return TEAM_NAME_MSG.requiredMessage;
  }
}
