import { Question, QuestionSet } from 'nest-commander';
import { validateUserStory } from '../validation';

@QuestionSet({ name: 'user-story-questions' })
export class UserStoryQuestions {
  @Question({
    message: 'Enter user-story:',
    name: 'userStory',
    type: 'input',
    default: 'As a <type-of-user>, I want <some-goal> so that <some-reason>',
    validate: validateUserStory,
  })
  parseUserStory(val: string): string {
    return val;
  }
}
