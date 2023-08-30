import { Question, QuestionSet } from 'nest-commander';
import { ProjectIdAnswerDTO } from '../dto';
import { validate, ValidationError } from 'class-validator';
import { validateProjectId } from '../validation';

@QuestionSet({ name: 'project-id-questions' })
export class ProjectIdQuestions {
  @Question({
    message: 'Enter ID (PPP):',
    name: 'ID',
    type: 'input',
    validate: validateProjectId,
  })
  parseId(val: string): string {
    return val;
  }
}
