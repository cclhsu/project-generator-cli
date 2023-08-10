import { Module } from '@nestjs/common';
// import { TypescriptController } from './typescript.controller';
import { TypescriptService } from './typescript.service';
import { CommonCommandModule } from 'src/common/command/common-command.module';
import { TypescriptCommand } from './command/typescript.command';
import { InitTypescriptCommand } from './command/init-typescript.command';
import { BuildTypescriptCommand } from './command/build-typescript.command';
import { TestTypescriptCommand } from './command/test-typescript.command';
import { RunTypescriptCommand } from './command/run-typescript.command';
import { CleanTypescriptCommand } from './command/clean-typescript.command';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  // controllers: [
  //   TypescriptController,
  // ],
  providers: [
    TypescriptService,
    CommonCommandModule,
    TypescriptCommand,
    InitTypescriptCommand,
    BuildTypescriptCommand,
    RunTypescriptCommand,
    TestTypescriptCommand,
    CleanTypescriptCommand,
  ],
  exports: [TypescriptService],
})
export class TypescriptModule {}
