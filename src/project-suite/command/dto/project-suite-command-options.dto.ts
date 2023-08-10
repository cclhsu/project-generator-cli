import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ProjectSuiteCommandOptionsDTO {
  // @ApiProperty()
  // @IsString()
  // configPath?: string;

  @ApiProperty()
  @IsString()
  templateRoot?: string;

  @ApiProperty()
  @IsString()
  projectSuiteVariablesFilePath?: string;

  @ApiProperty()
  @IsString()
  projectSuiteVariablesFileName?: string;

  @ApiProperty()
  @IsString()
  projectSuiteType?: string;

  @ApiProperty()
  @IsString()
  ProjectSuiteRootPath?: string;

  @ApiProperty()
  @IsString()
  projectSuiteGitProvider?: string;

  @ApiProperty()
  @IsString()
  projectSuiteName?: string;
}
