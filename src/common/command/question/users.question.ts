import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import {
  convertStringToArray,
  convertStringToIdUuidArray,
  isValidIdUuidArray,
} from '../../../utils/array';
import { isValidUuids } from '../validation';
import { IdUuidDTO } from '../../../common/dto';

@QuestionSet({ name: 'users-questions' })
@Injectable()
export class UsersQuestions {
  @Question({
    message: 'Enter users:',
    name: 'users',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Users are required';
    //   }
    // },
  })
  parseUsers(val: string): IdUuidDTO[] {
    const items: IdUuidDTO[] = convertStringToIdUuidArray(val);
    if (!isValidIdUuidArray(items)) {
      throw new Error(
        UsersQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
