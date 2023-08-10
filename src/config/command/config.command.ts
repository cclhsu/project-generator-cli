import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ListConfigsCommand } from './list-configs.command';
import { GetConfigCommand } from './get-config.command';
import { CreateConfigCommand } from './create-config.command';
import { UpdateConfigCommand } from './update-config.command';
import { DeleteConfigCommand } from './delete-config.command';
// import { ConfigService } from 'src/config/config.service';

@Injectable()
@Command({
  name: 'config',
  description: 'A set of commands for managing configs',
  arguments: '<action> [options]',
  subCommands: [
    ListConfigsCommand,
    GetConfigCommand,
    CreateConfigCommand,
    UpdateConfigCommand,
    DeleteConfigCommand,
  ],
})
export class ConfigCommand extends CommandRunner {
  private readonly logger = new Logger(ConfigCommand.name);
  constructor(private readonly inquirer: InquirerService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running config command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main config --help
// node ./dist/cmd.main config

// node ./dist/cmd.main config --username john.doe --email john.doe@mail.com --phone 1234567890
