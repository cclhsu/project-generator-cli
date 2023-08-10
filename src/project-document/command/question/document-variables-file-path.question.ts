import { Question, QuestionSet } from 'nest-commander';
import { DEFAULT_VARIABLE_FILE_PATH } from 'src/common/constant/common.constant';

@QuestionSet({ name: 'document-variables-path-name-questions' })
export class DocumentVariablesFilePathQuestions {
  @Question({
    message: 'Enter variables-file-path:',
    name: 'documentVariablesFilePath',
    type: 'input',
    default: DEFAULT_VARIABLE_FILE_PATH,
  })
  parseDocumentVariablesFilePath(val: string): string {
    return val;
  }
}
