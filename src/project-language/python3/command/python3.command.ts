import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { Python3Service } from '../../../project-language/python3/python3.service';
import { InitPython3Command } from './init-python3.command';
import { BuildPython3Command } from './build-python3.command';
import { RunPython3Command } from './run-python3.command';
import { TestPython3Command } from './test-python3.command';
import { CleanPython3Command } from './clean-python3.command';
// import { Python3Service } from '../../python3/python3.service';

@Injectable()
@Command({
  name: 'python3',
  description: 'A set of commands for managing python3 project',
  arguments: '<action> [options]',
  subCommands: [
    InitPython3Command,
    BuildPython3Command,
    RunPython3Command,
    TestPython3Command,
    CleanPython3Command,
  ],
})
export class Python3Command extends CommandRunner {
  private readonly logger = new Logger(Python3Command.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly python3Service: Python3Service,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running python3 command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main python3 --help
// node ./dist/cmd.main python3

// node ./dist/cmd.main python3 -s src -g github -l python3 -t library -e team -u user -n project -m module
