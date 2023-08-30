import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'details-questions' })
export class DetailQuestions {
  @Question({
    message: 'Enter details:',
    name: 'details',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Detail is required';
    //   }
    // },
  })
  parseDetail(val: string): string {
    return val;
  }
}
