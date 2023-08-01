import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { TypescriptService } from 'src/typescript/typescript.service';
import { InitTypescriptCommand } from './init-typescript.command';
import { BuildTypescriptCommand } from './build-typescript.command';
import { RunTypescriptCommand } from './run-typescript.command';
import { TestTypescriptCommand } from './test-typescript.command';
import { CleanTypescriptCommand } from './clean-typescript.command';

@Injectable()
@Command({
  name: 'typescript',
  description: 'A set of commands for managing typescript project',
  arguments: '<action> [options]',
  subCommands: [
    InitTypescriptCommand,
    BuildTypescriptCommand,
    RunTypescriptCommand,
    TestTypescriptCommand,
    CleanTypescriptCommand,
  ],
})
export class TypescriptCommand extends CommandRunner {
  private readonly logger = new Logger(TypescriptCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly typescriptService: TypescriptService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.log('>>> Running typescript command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main typescript --help
// node ./dist/cmd.main typescript

// node ./dist/cmd.main typescript -s src -g github -l typescript -t library -e team -u user -n project -m module
