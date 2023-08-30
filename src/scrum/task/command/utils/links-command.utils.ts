/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { CREATE_ACTION_TYPE } from '../../../../common/constant';
import { NameUrlDTO } from '../../../../common/dto';
import { getNameUrlDTO } from './link-command.utils';
import { MoreLinkAnswerDTO } from '../../../../common/command/dto';

const logger = new Logger('getlinksDTO');

export async function getlinksDTO(
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<NameUrlDTO[]> {
  const links: NameUrlDTO[] = options?.links ?? [];

  let moreLink: boolean = false;
  do {
    moreLink = (
      await inquirer.ask<MoreLinkAnswerDTO>('more-link-questions', options)
    ).moreLink;

    if (moreLink) {
      const nameUrlDTO: NameUrlDTO = await getNameUrlDTO(
        inquirer,
        options,
        action,
      );
      links.push(nameUrlDTO);
    }
  } while (moreLink);

  logger.verbose(JSON.stringify(links));

  return links;
}
