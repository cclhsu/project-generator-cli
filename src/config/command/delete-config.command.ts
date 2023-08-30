import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { ProjectCommonCommandOptionsDTO } from '../../common/command/dto/project-common-command-options.dto';
import { ConfirmDeleteAnswerDTO } from '../../common/command/dto/confirm-delete-answer.dto';
import { getProjectName } from '../../utils/project-name/project-name.utils';

@Injectable()
@SubCommand({
  name: 'delete',
  description: 'A command to delete a config',
})
export class DeleteConfigCommand extends CommandRunner {
  private readonly logger = new Logger(DeleteConfigCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Deleting config');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file not exists
    const packageProjectName: string = getProjectName();
    if (!this.configService.isConfigFileExists(packageProjectName)) {
      console.log('Config file not exists');
      return;
    }

    // const projectCommonCommandOptionsDTO: ProjectCommonCommandOptionsDTO = {
    //   ...options,
    // };

    const confirmDeleteAnswerDTO: ConfirmDeleteAnswerDTO =
      await this.inquirer.ask<ConfirmDeleteAnswerDTO>(
        'confirm-delete-questions',
        options,
      );

    if (!confirmDeleteAnswerDTO.confirmDelete) {
      console.log('Config deletion cancelled');
      return;
    }

    try {
      await this.configService.deleteConfig(packageProjectName);
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main config delete --help
// node ./dist/cmd.main config delete --uuid 00000000-0000-0000-0000-000000000001
