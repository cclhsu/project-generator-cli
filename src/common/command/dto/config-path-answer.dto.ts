import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class ConfigPathAnswerDto {
  constructor(configPath: string) {
    this.configPath = configPath;
  }
  @ApiProperty()
  @IsString()
  configPath: string;
}
