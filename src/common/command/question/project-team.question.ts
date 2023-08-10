import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'project-team-questions' })
export class ProjectTeamQuestions {
  @Question({
    message: 'Enter project-team:',
    name: 'projectTeam',
    type: 'input',
  })
  parseProjectTeam(val: string): string {
    return val;
  }
}
