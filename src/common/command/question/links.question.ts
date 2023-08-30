import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { convertStringToArray } from '../../../utils/array';
import { isValidUuids } from '../validation';

@QuestionSet({ name: 'links-questions' })
@Injectable()
export class LinksQuestions {
  @Question({
    message: 'Enter links:',
    name: 'links',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'links are required';
    //   }
    // },
  })
  parseLinks(val: string): string[] {
    const items: string[] = convertStringToArray(val);
    if (!isValidUuids(items)) {
      throw new Error(
        LinksQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
