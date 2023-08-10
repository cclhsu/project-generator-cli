import { Module } from '@nestjs/common';
// import { RustController } from './rust.controller';
import { RustService } from './rust.service';
import { CommonCommandModule } from 'src/common/command/common-command.module';
import { RustCommand } from './command/rust.command';
import { InitRustCommand } from './command/init-rust.command';
import { BuildRustCommand } from './command/build-rust.command';
import { TestRustCommand } from './command/test-rust.command';
import { RunRustCommand } from './command/run-rust.command';
import { CleanRustCommand } from './command/clean-rust.command';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  // controllers: [
  //   RustController,
  // ],
  providers: [
    RustService,
    CommonCommandModule,
    RustCommand,
    InitRustCommand,
    BuildRustCommand,
    RunRustCommand,
    TestRustCommand,
    CleanRustCommand,
  ],
  exports: [RustService],
})
export class RustModule {}
