import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'tags-questions' })
@Injectable()
export class TagsQuestions {
  @Question({
    message: 'Enter tags:',
    name: 'tags',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Tags are required';
      }
    },
  })
  parseTags(val: string): string[] {
    return val.split(',').map((tag) => tag.trim());
  }
}
