import { Question, QuestionSet } from 'nest-commander';
import { validateTeamName } from '../validation';

@QuestionSet({ name: 'team-name-questions' })
export class TeamNameQuestions {
  @Question({
    message: 'Enter team name:',
    name: 'teamName',
    type: 'input',
    validate: validateTeamName,
  })
  parseTeamName(val: string): string {
    return val;
  }
}
