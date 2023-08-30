import { Question, QuestionSet } from 'nest-commander';
import { validateUserId, validateUuid } from '../validation';
import {
  convertStringToIdUuidDTO,
  validateIdUuid,
} from '../validation/id-uuid.validation';
import { IdUuidDTO } from '../../../common/dto';

@QuestionSet({ name: 'product-owner-questions' })
export class ProductOwnerQuestions {
  @Question({
    message: 'Enter product-owner:',
    name: 'productOwner',
    type: 'input',
    validate: validateIdUuid,
  })
  parseProductOwner(val: string): IdUuidDTO {
    return convertStringToIdUuidDTO(val);
  }
}
