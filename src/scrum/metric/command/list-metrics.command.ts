import {
  CommandRunner,
  InquirerService,
  Option,
  SubCommand,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { MetricService } from '../metric.service';
import { MetricResponseDTO } from '../dto/metric-response.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
@SubCommand({
  name: 'list',
  description: 'A command to list metrics',
  options: { isDefault: true },
})
export class ListMetricsCommand extends CommandRunner {
  private readonly logger = new Logger(ListMetricsCommand.name);
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
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    const metric: MetricResponseDTO[] = await this.metricService.listMetrics();
    console.log(JSON.stringify(metric, null, 2));
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main metric list --help
// node ./dist/cmd.main metric list
