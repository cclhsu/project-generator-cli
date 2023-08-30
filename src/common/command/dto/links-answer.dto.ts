import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { NameUrlDTO } from '../../../common/dto';

export class LinksAnswerDTO {
  constructor(links: NameUrlDTO[]) {
    this.links = links;
  }

  @ApiProperty({
    description: 'An array of NameUrlDTOs.',
    type: () => NameUrlDTO,
    isArray: true,
  })
  @Expose({ name: 'links', toPlainOnly: true })
  @IsArray({ message: 'Links must be an array' })
  @ValidateNested({ each: true })
  links: NameUrlDTO[];
}
