import { Question, QuestionSet } from 'nest-commander';
import { IterationIdAnswerDTO } from '../dto';
import { validate, ValidationError } from 'class-validator';
import { validateIterationId } from '../validation';

@QuestionSet({ name: 'iteration-id-questions' })
export class IterationIdQuestions {
  @Question({
    message: 'Enter ID (PPP:YYYY/MM/DD-YYYY/MM/DD):',
    name: 'ID',
    type: 'input',
    validate: validateIterationId,
  })
  parseId(val: string): string {
    return val;
  }
}
