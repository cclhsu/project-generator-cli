import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'scrum-master-questions' })
export class ScrumMasterQuestions {
  @Question({
    message: 'Enter master:',
    name: 'scrumMaster',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'master is required';
      }
    },
  })
  parseScrumMaster(val: string): string {
    return val;
  }
}
