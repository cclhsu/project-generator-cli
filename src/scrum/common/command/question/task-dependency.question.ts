import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_DEPENDENCY_LEVEL,
  DEPENDENCY_LEVELS,
} from '../../constant/dependency-level.constant';

@QuestionSet({ name: 'task-dependency-questions' })
export class TaskDependencyQuestions {
  @Question({
    message: 'Enter task-dependency:',
    name: 'taskDependency',
    type: 'list',
    default: DEFAULT_DEPENDENCY_LEVEL,
    choices: DEPENDENCY_LEVELS,
  })
  parseTaskDependency(val: string): string {
    return val;
  }
}
