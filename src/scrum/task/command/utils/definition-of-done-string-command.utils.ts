import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { DefinitionOfDoneStringAnswerDTO } from '../../../../common/command/dto';
import { CREATE_ACTION_TYPE } from '../../../../common/constant';

const logger = new Logger('getDefinitionOfDoneDTO');

export async function getDefinitionOfDoneStringDTO(
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<string> {
  const definitionOfDone = (
    await inquirer.ask<DefinitionOfDoneStringAnswerDTO>(
      'definition-of-done-string-questions',
      options,
    )
  ).definitionOfDoneString;

  logger.verbose(JSON.stringify(definitionOfDone));

  return definitionOfDone;
}
