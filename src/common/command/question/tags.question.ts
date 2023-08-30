import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { convertStringToArray } from '../../../utils/array';
import { isValidUuids } from '../validation';

@QuestionSet({ name: 'tags-questions' })
@Injectable()
export class TagsQuestions {
  @Question({
    message: 'Enter tags:',
    name: 'tags',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Tags are required';
    //   }
    // },
  })
  parseTags(val: string): string[] {
    const items: string[] = convertStringToArray(val);
    if (!isValidUuids(items)) {
      throw new Error(
        TagsQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
