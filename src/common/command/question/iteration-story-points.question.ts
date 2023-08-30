import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'iteration-story-points-questions' })
export class IterationStoryPointsQuestions {
  @Question({
    message: 'Enter iterationStoryPoints:',
    name: 'iterationStoryPoints',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'IterationStoryPoints is required';
    //   }
    // },
  })
  parseIterationStoryPoints(val: string): string {
    return val;
  }
}
