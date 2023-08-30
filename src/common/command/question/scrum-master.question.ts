import { Question, QuestionSet } from 'nest-commander';
import { validateUserId, validateUuid } from '../validation';
import {
  convertStringToIdUuidDTO,
  validateIdUuid,
} from '../validation/id-uuid.validation';
import { IdUuidDTO } from '../../../common/dto';

@QuestionSet({ name: 'scrum-master-questions' })
export class ScrumMasterQuestions {
  @Question({
    message: 'Enter master:',
    name: 'scrumMaster',
    type: 'input',
    validate: validateIdUuid,
  })
  parseScrumMaster(val: string): IdUuidDTO {
    return convertStringToIdUuidDTO(val);
  }
}
