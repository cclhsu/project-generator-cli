import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'project-skeleton-questions' })
export class ProjectSkeletonQuestions {
  @Question({
    message: 'Enter your project-skeleton:',
    name: 'projectSkeleton',
    type: 'list',
    default: 'default',
    choices: [
      'default',
      'helloworld',
      'coding-challenge',
      'coding-problem',
      'coding-test',
    ],
  })
  parseProjectSkeleton(val: string): string {
    return val;
  }
}
