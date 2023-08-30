import { Question, QuestionSet } from 'nest-commander';
import { validateProjectName } from '../validation';

@QuestionSet({ name: 'project-name-questions' })
export class ProjectNameQuestions {
  @Question({
    message: 'Enter project-name:',
    name: 'projectName',
    type: 'input',
    validate: validateProjectName,
  })
  parseProjectName(val: string): string {
    return val;
  }
}
