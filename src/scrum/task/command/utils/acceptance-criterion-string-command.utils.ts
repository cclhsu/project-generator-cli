import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { AcceptanceCriterionStringAnswerDTO } from '../../../../common/command/dto';
import { CREATE_ACTION_TYPE } from '../../../../common/constant';

const logger = new Logger('getAcceptanceCriterionDTO');

export async function getAcceptanceCriterionStringDTO(
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<string> {
  const acceptanceCriterion = (
    await inquirer.ask<AcceptanceCriterionStringAnswerDTO>(
      'acceptance-criterion-string-questions',
      options,
    )
  ).acceptanceCriterionString;

  logger.verbose(JSON.stringify(acceptanceCriterion));

  return acceptanceCriterion;
}
