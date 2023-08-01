import { ConsoleLogger, Module } from '@nestjs/common';
// import { CsvModule } from './utils/csv/csv.module';
// import { JsonModule } from './utils/json/json.module';
// import { YamlModule } from './utils/yaml/yaml.module';
// import { HelloModule } from './hello/hello.module';
// import { UserModule } from './user/user.module';
// import { CommonCommandModule } from './common/command/common-command.module';
// import { ConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    // JsonModule,
    // YamlModule,
    // CsvModule,
    // HelloModule,
    // UserModule,
    // CommonCommandModule,
    // ConfigModule,
  CommonModule,
    ConfigModule,
    UtilsModule],
  controllers: [],
  providers: [ConsoleLogger],
})
export class CmdModule {}
