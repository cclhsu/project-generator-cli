import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import {
  convertStringToArray,
  convertStringToIdUuidStatusArray,
  isValidIdUuidStatusArray,
} from '../../../utils/array';
import { isValidUuids } from '../validation';
import { IdUuidStatusDTO } from '../../../common/dto';

@QuestionSet({ name: 'blocked-tasks-questions' })
@Injectable()
export class BlockedTasksQuestions {
  @Question({
    message: 'Enter blocked-tasks:',
    name: 'blocked-tasks',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'BlockedTasks are required';
    //   }
    // },
  })
  parseBlockedTasks(val: string): IdUuidStatusDTO[] {
    const items: IdUuidStatusDTO[] = convertStringToIdUuidStatusArray(val);
    if (!isValidIdUuidStatusArray(items)) {
      throw new Error(
        BlockedTasksQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
