import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'document-file-name-questions' })
export class DocumentFileNameQuestions {
  @Question({
    message: 'Enter document-file-name:',
    name: 'documentFileName',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'document-file-name is required';
      }
    },
  })
  parseDocumentFileName(val: string): string {
    return val;
  }
}
