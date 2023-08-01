import { ConsoleLogger, Module } from '@nestjs/common';
import { CsvModule } from './utils/csv/csv.module';
import { JsonModule } from './utils/json/json.module';
import { YamlModule } from './utils/yaml/yaml.module';
import { HelloModule } from './hello/hello.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';
import { UtilsModule } from './utils/utils.module';
import { CommonCommandModule } from './common/command/common-command.module';
import { GoModule } from './go/go.module';
import { Python3Module } from './python3/python3.module';
import { RustModule } from './rust/rust.module';
import { TypescriptModule } from './typescript/typescript.module';

@Module({
  imports: [
    JsonModule,
    YamlModule,
    CsvModule,
    HelloModule,
    CommonCommandModule,
    CommonModule,
    ConfigModule,
    UtilsModule,
    GoModule,
    Python3Module,
    RustModule,
    TypescriptModule,
  ],
  controllers: [],
  providers: [ConsoleLogger],
})
export class CmdModule {}
