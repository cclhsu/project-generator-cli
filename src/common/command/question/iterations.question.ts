import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import {
  convertStringToArray,
  convertStringToIdUuidStatusArray,
  isValidIdUuidStatusArray,
} from '../../../utils/array';
import { isValidUuids } from '../validation';
import { IdUuidStatusDTO } from '../../../common/dto';

@QuestionSet({ name: 'iterations-questions' })
@Injectable()
export class IterationsQuestions {
  @Question({
    message: 'Enter iterations:',
    name: 'iterations',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Iterations are required';
      }
    },
  })
  parseIterations(val: string): IdUuidStatusDTO[] {
    const items: IdUuidStatusDTO[] = convertStringToIdUuidStatusArray(val);
    if (!isValidIdUuidStatusArray(items)) {
      throw new Error(
        IterationsQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
