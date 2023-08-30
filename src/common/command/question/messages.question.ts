import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import {
  convertStringToArray,
  convertStringToIdUuidArray,
  isValidIdUuidArray,
} from '../../../utils/array';
import { isValidUuids } from '../validation';
import { IdUuidDTO } from '../../../common/dto';

@QuestionSet({ name: 'messages-questions' })
@Injectable()
export class MessagesQuestions {
  @Question({
    message: 'Enter messages:',
    name: 'messages',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Messages are required';
    //   }
    // },
  })
  parseMessages(val: string): IdUuidDTO[] {
    const items: IdUuidDTO[] = convertStringToIdUuidArray(val);
    if (!isValidIdUuidArray(items)) {
      throw new Error(
        MessagesQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
