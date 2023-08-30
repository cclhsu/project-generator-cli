import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'content-questions' })
export class ContentQuestions {
  @Question({
    message: 'Enter content:',
    name: 'content',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Content is required';
    //   }
    // },
  })
  parseContent(val: string): string {
    return val;
  }
}
