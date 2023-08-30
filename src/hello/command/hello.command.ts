import { Command, CommandRunner, Option } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { HelloService } from '../../hello/hello.service';

interface HelloCommandOptions {
  string?: boolean;
  json?: boolean;
}

@Injectable()
@Command({ name: 'hello', description: 'A parameter parse' })
export class HelloCommand extends CommandRunner {
  private readonly logger = new Logger(HelloCommand.name);
  private readonly helloService: HelloService;
  constructor() {
    super();
    this.helloService = new HelloService();
  }

  async run(
    passedParams: string[],
    options?: HelloCommandOptions,
  ): Promise<void> {
    if (options?.string) {
      await this.helloString(passedParams);
    } else if (options?.json) {
      await this.helloJson(passedParams);
    } else {
      this.runWithNone(passedParams);
    }
  }

  async helloString(param: string[]): Promise<void> {
    const response = await this.helloService.getHelloString();
    this.logger.log({ param, response });
  }

  async helloJson(param: string[]): Promise<void> {
    const response = await this.helloService.getHelloJson();
    this.logger.log({ param, response });
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'Call helloString',
  })
  parseString(val: string): boolean {
    return true;
  }

  @Option({
    flags: '-j, --json [json]',
    description: 'Call helloJson',
  })
  parseJson(val: string): boolean {
    return true;
  }

  runWithNone(param: string[]): void {
    this.logger.log({ param });
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main hello -s
// node ./dist/cmd.main hello -j
