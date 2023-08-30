import { Module } from '@nestjs/common';
// import { Python3Controller } from './python3.controller';
import { Python3Service } from './python3.service';
import { CommonCommandModule } from '../../common/command/common-command.module';
import { Python3Command } from './command/python3.command';
import { InitPython3Command } from './command/init-python3.command';
import { BuildPython3Command } from './command/build-python3.command';
import { TestPython3Command } from './command/test-python3.command';
import { RunPython3Command } from './command/run-python3.command';
import { CleanPython3Command } from './command/clean-python3.command';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  // controllers: [
  //   Python3Controller,
  // ],
  providers: [
    Python3Service,
    CommonCommandModule,
    Python3Command,
    InitPython3Command,
    BuildPython3Command,
    RunPython3Command,
    TestPython3Command,
    CleanPython3Command,
  ],
  exports: [Python3Service],
})
export class Python3Module {}
