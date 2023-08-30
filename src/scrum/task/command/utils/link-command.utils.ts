import { Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { UrlNameAnswerDTO, UrlAnswerDTO } from '../../../../common/command/dto';
import { CREATE_ACTION_TYPE } from '../../../../common/constant';
import { NameUrlDTO } from '../../../../common/dto';


const logger = new Logger('getNameUrlDTO');

export async function getNameUrlDTO(
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<NameUrlDTO> {
  const nameUrlDTO: NameUrlDTO = options?.url ?? '';

  // ********************************************************************

  if (!nameUrlDTO.name) {
    nameUrlDTO.name = (
      await inquirer.ask<UrlNameAnswerDTO>('url-name-questions', options)
    ).urlName;
  }

  if (!nameUrlDTO.url) {
    nameUrlDTO.url = (
      await inquirer.ask<UrlAnswerDTO>('url-questions', options)
    ).url;
  }

  logger.verbose(JSON.stringify(nameUrlDTO));

  return nameUrlDTO;
}
