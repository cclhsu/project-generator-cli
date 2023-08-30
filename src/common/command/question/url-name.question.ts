import { Question, QuestionSet } from 'nest-commander';
// import { validateUrlName } from '../validation';

@QuestionSet({ name: 'url-name-questions' })
export class UrlNameQuestions {
  @Question({
    message: 'Enter url Name:',
    name: 'url',
    type: 'input',
    // validate: validateUrlName,
  })
  parseUrlName(val: string): string {
    return val;
  }
}
