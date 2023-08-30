/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { CREATE_ACTION_TYPE } from '../../../../common/constant';
import { getDefinitionOfDoneStringDTO } from './definition-of-done-string-command.utils';
import { MoreDefinitionOfDoneAnswerDTO } from '../../../../common/command/dto';

const logger = new Logger('getDefinitionsOfDoneStringDTO');

export async function getDefinitionsOfDoneStringDTO(
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<string[]> {
  const definitionsOfDone: string[] = options?.definitionsOfDone ?? [];

  let moreDefinitionOfDone: boolean = false;
  do {
    moreDefinitionOfDone = (
      await inquirer.ask<MoreDefinitionOfDoneAnswerDTO>(
        'more-definition-of-done-questions',
        options,
      )
    ).moreDefinitionOfDone;

    if (moreDefinitionOfDone) {
      const definitionOfDone: string =
        await getDefinitionOfDoneStringDTO(
          inquirer,
          options,
          action,
        );
      definitionsOfDone.push(definitionOfDone);
    }
  } while (moreDefinitionOfDone);

  logger.verbose(JSON.stringify(definitionsOfDone));

  return definitionsOfDone;
}
