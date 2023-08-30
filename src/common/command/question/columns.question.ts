import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { convertStringToArray } from '../../../utils/array';
import { isValidUuids } from '../validation';

@QuestionSet({ name: 'columns-questions' })
@Injectable()
export class ColumnsQuestions {
  @Question({
    message: 'Enter columns',
    name: 'columns',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Columns are required';
    //   }
    // },
  })
  parseColumns(val: string): string[] {
    const items: string[] = convertStringToArray(val);
    if (!isValidUuids(items)) {
      throw new Error(
        ColumnsQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
