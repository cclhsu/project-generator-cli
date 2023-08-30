import { Question, QuestionSet } from 'nest-commander';
import { DOCUMENT_TEMPLATE_TYPES } from '../../../common/constant';

@QuestionSet({ name: 'document-type-questions' })
export class DocumentTypeQuestions {
  @Question({
    message: 'Enter document-type:',
    name: 'documentType',
    type: 'list',
    default: 'hld',
    choices: DOCUMENT_TEMPLATE_TYPES,
  })
  parseDocumentType(val: string): string {
    return val;
  }
}
