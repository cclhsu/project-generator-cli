import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import {
  convertStringToArray,
  convertStringToIdUuidStatusArray,
  isValidIdUuidStatusArray,
} from '../../../utils/array';
import { isValidUuids } from '../validation';
import { IdUuidStatusDTO } from '../../../common/dto';

@QuestionSet({ name: 'task-relations-questions' })
@Injectable()
export class TaskRelationsQuestions {
  @Question({
    message: 'Enter taskrelations:',
    name: 'taskrelations',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'TaskRelations are required';
    //   }
    // },
  })
  parseTaskRelations(val: string): IdUuidStatusDTO[] {
    const items: IdUuidStatusDTO[] = convertStringToIdUuidStatusArray(val);
    if (!isValidIdUuidStatusArray(items)) {
      throw new Error(
        TaskRelationsQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
