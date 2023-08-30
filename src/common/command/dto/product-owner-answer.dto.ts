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
import { IdUuidDTO } from '../../../common/dto';

export class ProductOwnerAnswerDTO {
  constructor(productOwner: IdUuidDTO) {
    this.productOwner = productOwner;
  }

  @ApiProperty({
    description:
      'ID and UUID of the user who is the Product Owner of the Scrum Team (UUID)',
    example: '{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000001"}',
  })
  @Expose({ name: 'productOwner', toPlainOnly: true })
  @IsObject()
  productOwner: IdUuidDTO;

  // @ApiProperty({
  //   description: 'IDs of team productOwner in the Team Metadata (ID)',
  //   example: 'john.doe',
  //   type: String,
  // })
  // @Expose({ name: 'productOwner', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // productOwner: IdUuidDTO;
}
