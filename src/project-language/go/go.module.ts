import { Module } from '@nestjs/common';
// import { GoController } from './go.controller';
import { GoService } from './go.service';
import { CommonCommandModule } from '../../common/command/common-command.module';
import { GoCommand } from './command/go.command';
import { InitGoCommand } from './command/init-go.command';
import { BuildGoCommand } from './command/build-go.command';
import { TestGoCommand } from './command/test-go.command';
import { RunGoCommand } from './command/run-go.command';
import { CleanGoCommand } from './command/clean-go.command';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  // controllers: [
  //   GoController,
  // ],
  providers: [
    GoService,
    CommonCommandModule,
    GoCommand,
    InitGoCommand,
    BuildGoCommand,
    RunGoCommand,
    TestGoCommand,
    CleanGoCommand,
  ],
  exports: [GoService],
})
export class GoModule {}
