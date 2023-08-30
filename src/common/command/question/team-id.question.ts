import { Question, QuestionSet } from 'nest-commander';
import { validateTeamId } from '../validation';


@QuestionSet({ name: 'team-id-questions' })
export class TeamIdQuestions {
  @Question({
    message: 'Enter ID:',
    name: 'ID',
    type: 'input',
    validate: validateTeamId,
  })
  parseId(val: string): string {
    return val;
  }
}
