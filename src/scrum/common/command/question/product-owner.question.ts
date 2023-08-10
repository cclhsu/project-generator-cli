import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'product-owner-questions' })
export class ProductOwnerQuestions {
  @Question({
    message: 'Enter product-owner:',
    name: 'productOwner',
    type: 'input',
    validate: (val: string) => {
      if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
        return true;
      } else {
        return 'product-owner is required';
      }
    },
  })
  parseProductOwner(val: string): string {
    return val;
  }
}
