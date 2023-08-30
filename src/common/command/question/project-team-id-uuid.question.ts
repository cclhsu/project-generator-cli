import { Question, QuestionSet } from 'nest-commander';
import { validateUserId, validateUuid } from '../validation';
import {
  convertStringToIdUuidDTO,
  validateIdUuid,
} from '../validation/id-uuid.validation';
import { IdUuidDTO } from '../../../common/dto';

@QuestionSet({ name: 'project-team-id-uuid-questions' })
export class ProjectTeamIdUuidQuestions {
  @Question({
    message: 'Enter team:',
    name: 'projectTeam',
    type: 'input',
    validate: validateIdUuid,
  })
  parseProjectTeam(val: string): IdUuidDTO {
    return convertStringToIdUuidDTO(val);
  }
}
