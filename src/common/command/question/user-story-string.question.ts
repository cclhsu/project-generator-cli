import { Question, QuestionSet } from 'nest-commander';
import { validateUserStory } from '../validation';

@QuestionSet({ name: 'user-story-string-questions' })
export class UserStoryStringQuestions {
  @Question({
    message: 'Enter user-story-string:',
    name: 'userStoryString',
    type: 'input',
    default: 'As a <type-of-user>, I want <some-goal> so that <some-reason>',
    validate: validateUserStory,
  })
  parseUserStoryString(val: string): string {
    return val;
  }
}
