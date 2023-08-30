import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { isValidUserId, isValidUuids } from '../validation';
import {
  convertStringToIdUuidArray,
  isValidIdUuidArray,
} from '../../../utils/array';
import { IdUuidDTO } from '../../../common/dto/id-uuid.dto';

@QuestionSet({ name: 'members-questions' })
@Injectable()
export class MembersQuestions {
  @Question({
    message: 'Enter members:',
    name: 'members',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Members are required';
    //   }
    // },
  })
  parseMembers(val: string): IdUuidDTO[] {
    const items: IdUuidDTO[] = convertStringToIdUuidArray(val);
    if (!isValidIdUuidArray(items)) {
      throw new Error(
        MembersQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
