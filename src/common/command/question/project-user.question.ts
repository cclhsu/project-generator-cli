import { Question, QuestionSet } from 'nest-commander';
import { validateUserId } from '../validation';

@QuestionSet({ name: 'project-user-questions' })
export class ProjectUserQuestions {
  @Question({
    message: 'Enter project-user:',
    name: 'projectUser',
    type: 'input',
    validate: validateUserId,
  })
  parseProjectUser(val: string): string {
    return val;
  }
}
