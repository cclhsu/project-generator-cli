import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'document-variables-file-name-questions' })
export class DocumentVariablesFileNameQuestions {
  @Question({
    message: 'Enter variables-file-name:',
    name: 'documentVariablesFileName',
    type: 'input',
    default: 'document-variables.json',
  })
  parseDocumentVariablesFileName(val: string): string {
    return val;
  }
}
