import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'project-iteration-questions' })
export class ProjectIterationQuestions {
  @Question({
    message: 'Enter project-iteration:',
    name: 'projectIteration',
    type: 'input',
  })
  parseProjectIteration(val: string): string {
    return val;
  }
}
