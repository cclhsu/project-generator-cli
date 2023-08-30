import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { MetricService } from '../metric.service';
import { MetricIdUuidDTO } from '../dto/metric-id-uuid.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list-metric-ids-uuids',
  description: 'A command to list metrics',
  options: { isDefault: true },
})
export class ListMetricIdsAndUUIDsCommand extends CommandRunner {
  private readonly logger = new Logger(ListMetricIdsAndUUIDsCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly metricService: MetricService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> Listing metric');
    // this.logger.verbose('passedParam: ' + JSON.stringify(passedParams, null, 2));
    // this.logger.verbose('options: ' + JSON.stringify(options, null, 2));

    try {
      const metrics: MetricIdUuidDTO[] =
        await this.metricService.listMetricIdsAndUUIDs();
      console.log(JSON.stringify(metrics, null, 2));
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.debug(error.stack);
    }
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main metric list --help
// node ./dist/cmd.main metric list
