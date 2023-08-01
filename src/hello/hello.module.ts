import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { HelloCommand } from './command/hello.command';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService, HelloCommand],
})
export class HelloModule {}
