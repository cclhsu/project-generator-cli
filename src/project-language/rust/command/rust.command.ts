import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { RustService } from 'src/project-language/rust/rust.service';
import { InitRustCommand } from './init-rust.command';
import { BuildRustCommand } from './build-rust.command';
import { RunRustCommand } from './run-rust.command';
import { TestRustCommand } from './test-rust.command';
import { CleanRustCommand } from './clean-rust.command';
// import { RustService } from 'src/rust/rust.service';

@Injectable()
@Command({
  name: 'rust',
  description: 'A set of commands for managing rust project',
  arguments: '<action> [options]',
  subCommands: [
    InitRustCommand,
    BuildRustCommand,
    RunRustCommand,
    TestRustCommand,
    CleanRustCommand,
  ],
})
export class RustCommand extends CommandRunner {
  private readonly logger = new Logger(RustCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly rustService: RustService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running rust command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main rust --help
// node ./dist/cmd.main rust

// node ./dist/cmd.main rust -s src -g github -l rust -t library -e team -u user -n project -m module
