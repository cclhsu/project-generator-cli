import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ConfigPathAnswerDTO {
  constructor(configPath: string) {
    this.configPath = configPath;
  }
  @ApiProperty()
  @IsString()
  configPath: string;
}
