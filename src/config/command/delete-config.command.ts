import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { ProjectCommonCommandOptionsDto } from 'src/common/command/dto/project-common-command-options.dto';
import { ConfirmDeleteAnswerDto } from '../../common/command/dto/confirm-delete-answer.dto';
import { getProjectName } from 'src/utils/project-name/project-name.utils';

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
    this.logger.log('>>> Deleting config');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file not exists
    const packageProjectName: string = getProjectName();
    if (!this.configService.isConfigFileExists(packageProjectName)) {
      console.log('Config file not exists');
      return;
    }

    // const projectCommonCommandOptionsDto: ProjectCommonCommandOptionsDto = {
    //   ...options,
    // };

    const confirmDeleteAnswerDto: ConfirmDeleteAnswerDto =
      await this.inquirer.ask<ConfirmDeleteAnswerDto>(
        'confirm-delete-questions',
        options,
      );

    if (!confirmDeleteAnswerDto.confirmDelete) {
      console.log('Config deletion cancelled');
      return;
    }

    this.configService.deleteConfig(packageProjectName);
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main config delete --help
// node ./dist/cmd.main config delete --uuid 123
