import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ProjectCommandOptionsDTO {
  @ApiProperty()
  @IsString()
  configPath?: string;

  @ApiProperty()
  @IsString()
  templateRoot?: string;

  @ApiProperty()
  @IsString()
  srcRoot?: string;

  @ApiProperty()
  @IsString()
  gitProvider?: string;

  @ApiProperty()
  @IsString()
  projectLanguage?: string;

  @ApiProperty()
  @IsString()
  projectType?: string;

  @ApiProperty()
  @IsString()
  projectSkeleton?: string;

  @ApiProperty()
  @IsString()
  projectTeam?: string;

  @ApiProperty()
  @IsString()
  projectUser?: string;

  @ApiProperty()
  @IsString()
  ticketNumber?: string;

  @ApiProperty()
  @IsString()
  projectName?: string;

  @ApiProperty()
  @IsString()
  moduleName?: string;

  @ApiProperty()
  @IsString()
  gitEnable?: boolean;
}
