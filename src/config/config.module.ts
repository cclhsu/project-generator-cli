import { Module } from '@nestjs/common';
// import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { CommonCommandModule } from 'src/common/command/common-command.module';
import { ConfigCommand } from './command/config.command';
import { CreateConfigCommand } from './command/create-config.command';
import { UpdateConfigCommand } from './command/update-config.command';
import { DeleteConfigCommand } from './command/delete-config.command';
import { GetConfigCommand } from './command/get-config.command';
// import { ListConfigsCommand } from './command/list-configs.command';
import { CsvModule } from 'src/utils/csv/csv.module';
import { JsonModule } from 'src/utils/json/json.module';
import { YamlModule } from 'src/utils/yaml/yaml.module';

@Module({
  imports: [JsonModule, YamlModule, CsvModule],
  controllers: [
    // ConfigController,
  ],
  providers: [
    ConfigService,
    CommonCommandModule,
    ConfigCommand,
    CreateConfigCommand,
    UpdateConfigCommand,
    DeleteConfigCommand,
    GetConfigCommand,
    // ListConfigsCommand,
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
