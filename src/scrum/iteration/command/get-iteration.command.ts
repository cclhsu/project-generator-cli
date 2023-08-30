import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { IterationService } from '../iteration.service';
import { UuidAnswerDTO } from '../../../common/command/dto';
import {
  validateCompletedAt,
  validateCreatedAt,
  validateEndDate,
  validateStartDate,
  validateStartedAt,
  validateUuid,
  validateUpdatedAt,
} from '../../../common/command/validation';
import { GetIterationByUuidRequestDTO, IterationDTO } from '../dto';

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
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    const iteration: GetIterationByUuidRequestDTO = {
      UUID: options?.uuid ?? '00000000-0000-0000-0000-000000000000',
      // metadata: null,
      // content: null,
      // ...options,
    };

    // ********************************************************************

    while (!iteration.UUID) {
      iteration.UUID = (
        await this.inquirer.ask<UuidAnswerDTO>('uuid-questions', options)
      ).UUID;
    }
    this.logger.verbose(`config: ${JSON.stringify(iteration.UUID, null, 2)}`);
    try {
      const iterationDTO: IterationDTO =
        await this.iterationService.getIteration(iteration.UUID);
      console.log(JSON.stringify(iterationDTO, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }

  @Option({
    flags: '-u, --uuid [UUID]',
    description: 'The UUID of the iteration',
    // defaultValue: '00000000-0000-0000-0000-000000000000',
  })
  parseUUID(val: string): string {
    const res = validateUuid(val);
    if (res === true) {
      return val;
    }
    throw new Error(res + ': ' + val + '\n');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main iteration get --help
// node ./dist/cmd.main iteration get --uuid 00000000-0000-0000-0000-000000000001
