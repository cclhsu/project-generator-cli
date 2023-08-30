import { Question, QuestionSet } from 'nest-commander';
import { validateUrl } from '../validation';

@QuestionSet({ name: 'url-questions' })
export class UrlQuestions {
  @Question({
    message: 'Enter url:',
    name: 'url',
    type: 'input',
    validate: validateUrl,
  })
  parseUrl(val: string): string {
    return val;
  }
}
