import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'more-user-story-questions' })
export class MoreUserStoryQuestions {
  @Question({
    message: 'More UserStory:',
    name: 'moreUserStory',
    type: 'confirm',
    default: false,
    validate: (val: boolean) => {
      if (typeof val === 'boolean') {
        return true;
      } else {
        return 'MoreUserStory is required';
      }
    },
  })
  parseMoreUserStory(val: string): string {
    return val;
  }
}
