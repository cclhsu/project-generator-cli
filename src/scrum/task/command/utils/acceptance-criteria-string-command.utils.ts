/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { CREATE_ACTION_TYPE } from '../../../../common/constant';
import { getAcceptanceCriterionStringDTO } from './acceptance-criterion-string-command.utils';
import { MoreAcceptanceCriterionAnswerDTO } from '../../../../common/command/dto';

const logger = new Logger('getAcceptanceCriteriaStringDTO');

export async function getAcceptanceCriteriaStringDTO(
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<string[]> {
  const userCriteria: string[] = options?.userCriteria ?? [];

  let moreAcceptanceCriterion: boolean = false;
  do {
    moreAcceptanceCriterion = (
      await inquirer.ask<MoreAcceptanceCriterionAnswerDTO>(
        'more-acceptance-criterion-questions',
        options,
      )
    ).moreAcceptanceCriterion;

    if (moreAcceptanceCriterion) {
      const userCriterion: string =
        await getAcceptanceCriterionStringDTO(
          inquirer,
          options,
          action,
        );
      userCriteria.push(userCriterion);
    }
  } while (moreAcceptanceCriterion);

  logger.verbose(JSON.stringify(userCriteria));

  return userCriteria;
}
