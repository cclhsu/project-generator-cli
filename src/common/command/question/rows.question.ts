import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { convertStringToArray } from '../../../utils/array';
import { isValidUuids } from '../validation';

@QuestionSet({ name: 'rows-questions' })
@Injectable()
export class RowsQuestions {
  @Question({
    message: 'Enter rows',
    name: 'rows',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Rows are required';
    //   }
    // },
  })
  parseRows(val: string): string[] {
    const items: string[] = convertStringToArray(val);
    if (!isValidUuids(items)) {
      throw new Error(
        RowsQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
