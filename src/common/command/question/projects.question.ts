import { Question, QuestionSet } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import {
  convertStringToArray,
  convertStringToIdUuidStatusArray,
  isValidIdUuidStatusArray,
} from '../../../utils/array';
import { isValidUuids } from '../validation';
import { IdUuidStatusDTO } from '../../../common/dto';

@QuestionSet({ name: 'projects-questions' })
@Injectable()
export class ProjectsQuestions {
  @Question({
    message: 'Enter projects:',
    name: 'projects',
    type: 'input',
    // validate: (val: string) => {
    //   if (val.trim() !== '' && val.trim().toLowerCase() !== 'n/a') {
    //     return true;
    //   } else {
    //     return 'Projects are required';
    //   }
    // },
  })
  parseProjects(val: string): IdUuidStatusDTO[] {
    const items: IdUuidStatusDTO[] = convertStringToIdUuidStatusArray(val);
    if (!isValidIdUuidStatusArray(items)) {
      throw new Error(
        ProjectsQuestions.name +
          ': Invalid user ID, UUID, Status in the list: ' +
          val,
      );
    }
    return items;
  }
}
