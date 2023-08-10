import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { IterationService } from '../iteration.service';
import { GetIterationCommandOptionsDTO } from './dto/get-iteration-command-options.dto';
import { IterationCommandOptionsDTO } from './dto/iteration-command-options.dto';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';

@Injectable()
@SubCommand({
  name: 'get',
  description: 'A command to get a iteration',
})
export class GetIterationCommand extends CommandRunner {
  private readonly logger = new Logger(GetIterationCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly iterationService: IterationService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Getting iteration');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const iterationCommandOptions: GetIterationCommandOptionsDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    while (!iterationCommandOptions.UUID) {
      iterationCommandOptions.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }

    this.displayResults(iterationCommandOptions.UUID ?? 'N/A');

    const iteration: IterationCommandOptionsDTO =
      await this.iterationService.getIteration(iterationCommandOptions.UUID);
    console.log(JSON.stringify(iteration, null, 2));
  }

  displayResults(UUID: string): void {
    console.log(`UUID: ${UUID}`);
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the iteration',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main iteration get --help
// node ./dist/cmd.main iteration get --uuid 00000000-0000-0000-0000-000000000001
