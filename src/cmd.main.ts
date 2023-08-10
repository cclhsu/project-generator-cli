#!/usr/bin/env node

import { CommandFactory } from 'nest-commander';
import { CmdModule } from './cmd.module';

async function bootstrap() {
  await CommandFactory.run(CmdModule, [
    'warn',
    'error',
    'log',
    'debug',
    'verbose',
  ]);
}

bootstrap();
