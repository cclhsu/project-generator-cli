import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';

@QuestionSet({ name: 'members-questions' })
@Injectable()
export class MembersQuestions {
  @Question({
    message: 'Enter members:',
    name: 'members',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Members are required';
    //   }
    // },
  })
  parseMembers(val: string): string[] {
    return val.split(',').map((member) => member.trim());
  }
}
