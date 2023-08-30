import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'goal-questions' })
export class GoalQuestions {
  @Question({
    message: 'Enter goal:',
    name: 'goal',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Goal is required';
    //   }
    // },
  })
  parseGoal(val: string): string {
    return val;
  }
}
