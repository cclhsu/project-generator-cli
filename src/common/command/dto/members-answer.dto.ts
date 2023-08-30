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
  Validate,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IdUuidDTO } from '../../../common/dto/id-uuid.dto';
import { IsArrayOfIdUuidDTO } from '../../../utils/decorator/IsArrayOfIdUuidDTO.decorator';

export class MembersAnswerDTO {
  constructor(members: IdUuidDTO[]) {
    this.members = members;
  }

  @ApiProperty({
    description: 'IdUuidDTO of team members in the Team',
    example: [{ ID: 'abc.xyz', UUID: '00000000-0000-0000-0000-000000000000' }],
    type: [IdUuidDTO],
  })
  @Expose({ name: 'members', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  members: IdUuidDTO[];
}
