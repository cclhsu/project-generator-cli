import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_PROJECT_LANGUAGE,
  PROJECT_LANGUAGE_TYPES,
  PROJECT_LANGUAGE_TYPE_ARRAY,
} from '../../constant';
import { validateProjectLanguage } from '../validation';

@QuestionSet({ name: 'project-language-questions' })
export class ProjectLanguageQuestions {
  @Question({
    message: 'Enter project-language:',
    name: 'projectLanguage',
    type: 'list',
    default: DEFAULT_PROJECT_LANGUAGE,
    choices: PROJECT_LANGUAGE_TYPE_ARRAY,
  })
  parseProjectLanguage(val: string): PROJECT_LANGUAGE_TYPES {
    const res = validateProjectLanguage(val);
    if (res === true) {
      return val as PROJECT_LANGUAGE_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
