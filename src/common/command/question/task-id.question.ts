import { Question, QuestionSet } from 'nest-commander';
import { validateTaskId } from '../validation';


@QuestionSet({ name: 'task-id-questions' })
export class TaskIdQuestions {
  @Question({
    message: 'Enter ID:',
    name: 'ID',
    type: 'input',
    validate: validateTaskId,
  })
  parseId(val: string): string {
    return val;
  }
}
