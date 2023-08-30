import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import {
  convertStringToArray,
  convertStringToIdUuidStatusArray,
  isValidIdUuidStatusArray,
} from '../../../utils/array';
import { isValidUuids } from '../validation';
import { IdUuidStatusDTO } from '../../../common/dto';

@QuestionSet({ name: 'subtasks-questions' })
@Injectable()
export class SubtasksQuestions {
  @Question({
    message: 'Enter subtasks:',
    name: 'subtasks',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Subtasks are required';
    //   }
    // },
  })
  parseSubTasks(val: string): IdUuidStatusDTO[] {
    const items: IdUuidStatusDTO[] = convertStringToIdUuidStatusArray(val);
    if (!isValidIdUuidStatusArray(items)) {
      throw new Error(
        SubtasksQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
