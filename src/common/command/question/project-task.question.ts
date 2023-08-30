import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'project-task-questions' })
export class ProjectTaskQuestions {
  @Question({
    message: 'Enter project-task:',
    name: 'projectTask',
    type: 'input',
  })
  parseProjectTask(val: string): string {
    return val;
  }
}
