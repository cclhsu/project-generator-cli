import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'document-file-path-questions' })
export class DocumentFilePathQuestions {
  @Question({
    message: 'Enter document-file-path:',
    name: 'documentFilePath',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'document-file-path is required';
    //   }
    // },
  })
  parseDocumentFilePath(val: string): string {
    return val;
  }
}
