import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'iteration-story-points-total-questions' })
export class IterationStoryPointsTotalQuestions {
  @Question({
    message: 'Enter iterationStoryPointsTotal:',
    name: 'iterationStoryPointsTotal',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'IterationStoryPointsTotal is required';
    //   }
    // },
  })
  parseIterationStoryPointsTotal(val: string): string {
    return val;
  }
}
