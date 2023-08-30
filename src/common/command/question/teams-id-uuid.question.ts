import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import {
  convertStringToArray,
  convertStringToIdUuidArray,
  isValidIdUuidArray,
} from '../../../utils/array';
import { isValidUuids } from '../validation';
import { IdUuidDTO } from '../../../common/dto';

@QuestionSet({ name: 'teams-id-uuid-questions' })
@Injectable()
export class TeamsIdUuidQuestions {
  @Question({
    message: 'Enter teams:',
    name: 'teams',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Teams are required';
    //   }
    // },
  })
  parseTeams(val: string): IdUuidDTO[] {
    const items: IdUuidDTO[] = convertStringToIdUuidArray(val);
    if (!isValidIdUuidArray(items)) {
      throw new Error(
        TeamsIdUuidQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
