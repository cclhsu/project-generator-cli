import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { IterationService } from '../iteration.service';
import { IterationResponseDTO } from '../dto/iteration-response.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list',
  description: 'A command to list iterations',
  options: { isDefault: true },
})
export class ListIterationsCommand extends CommandRunner {
  private readonly logger = new Logger(ListIterationsCommand.name);
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
    this.logger.debug('>>> Listing iteration');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const iteration: IterationResponseDTO[] = await this.iterationService.listIterations();
    console.log(JSON.stringify(iteration, null, 2));
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main iteration list --help
// node ./dist/cmd.main iteration list
