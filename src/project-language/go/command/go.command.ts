import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { GoService } from 'src/project-language/go/go.service';
import { InitGoCommand } from './init-go.command';
import { BuildGoCommand } from './build-go.command';
import { RunGoCommand } from './run-go.command';
import { TestGoCommand } from './test-go.command';
import { CleanGoCommand } from './clean-go.command';
// import { GoService } from 'src/go/go.service';

@Injectable()
@Command({
  name: 'go',
  description: 'A set of commands for managing go project',
  arguments: '<action> [options]',
  subCommands: [
    InitGoCommand,
    BuildGoCommand,
    RunGoCommand,
    TestGoCommand,
    CleanGoCommand,
  ],
})
export class GoCommand extends CommandRunner {
  private readonly logger = new Logger(GoCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly goService: GoService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running go command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main go --help
// node ./dist/cmd.main go

// node ./dist/cmd.main go -s src -g github -l go -t library -e team -u user -n project -m module
