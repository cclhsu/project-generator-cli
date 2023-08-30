import { Question, QuestionSet } from 'nest-commander';
import {
  DEFAULT_ITERATION_TYPE,
  ITERATION_TYPES,
  ITERATION_TYPE_ARRAY,
} from '../../../common/constant';
import { validateIterationType } from '../validation';

@QuestionSet({ name: 'iteration-type-questions' })
export class IterationTypeQuestions {
  @Question({
    message: 'Enter iteration-type:',
    name: 'iterationType',
    type: 'list',
    default: DEFAULT_ITERATION_TYPE,
    choices: ITERATION_TYPE_ARRAY,
  })
  parseIterationType(val: string): ITERATION_TYPES {
    const res = validateIterationType(val);
    if (res === true) {
      return val as ITERATION_TYPES;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}
