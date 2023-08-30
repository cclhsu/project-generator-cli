import { Question, QuestionSet } from 'nest-commander';
import { validateTeamId } from '../validation';

@QuestionSet({ name: 'project-team-questions' })
export class ProjectTeamQuestions {
  @Question({
    message: 'Enter project-team:',
    name: 'projectTeam',
    type: 'input',
    validate: validateTeamId,
  })
  parseProjectTeam(val: string): string {
    return val;
  }
}
