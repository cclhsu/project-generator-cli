import { Answers } from 'inquirer';
import { TEAM_ID_MSG, TeamIdAnswerDTO } from '../dto';
import { validateDto } from '../../../utils/validation/validation.utils';

export async function validateTeamIdDTO(
  val: string,
): Promise<boolean | string> {
  const dto = new TeamIdAnswerDTO(val);
  const errorMessage = await validateDto(dto);
  return errorMessage ?? true;
}

export function isValidTeamId(teamId: string): boolean {
  const teamIdRegex = TEAM_ID_MSG.regexp;
  return teamIdRegex.test(teamId);
}

export function validateTeamId(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidTeamId(val)) {
      return true;
    } else {
      return TEAM_ID_MSG.errorMessage;
    }
  } else {
    return TEAM_ID_MSG.requiredMessage;
  }
}
