import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class DocumentCommandOptionsDTO {
  // @ApiProperty()
  // @IsString()
  // configPath?: string;

  @ApiProperty()
  @IsString()
  templateRoot?: string;

  @ApiProperty()
  @IsString()
  documentVariablesFilePath?: string;

  @ApiProperty()
  @IsString()
  documentVariablesFileName?: string;

  @ApiProperty()
  @IsString()
  documentType?: string;

  @ApiProperty()
  @IsString()
  documentFilePath?: string;

  @ApiProperty()
  @IsString()
  documentFileName?: string;
}
