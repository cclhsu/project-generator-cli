import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'iteration-story-points-remaining-questions' })
export class IterationStoryPointsRemainingQuestions {
  @Question({
    message: 'Enter iterationStoryPointsRemaining:',
    name: 'iterationStoryPointsRemaining',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'IterationStoryPointsRemaining is required';
    //   }
    // },
  })
  parseIterationStoryPointsRemaining(val: string): string {
    return val;
  }
}
