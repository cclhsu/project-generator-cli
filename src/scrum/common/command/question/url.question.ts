import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'url-questions' })
export class UrlQuestions {
  @Question({
    message: 'Enter url:',
    name: 'url',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'Url is required';
      }
    },
  })
  parseUrl(val: string): string {
    return val;
  }
}
