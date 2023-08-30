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
import { IdUuidStatusDTO } from '../../../common/dto';
import { IsArrayOfIdUuidDTO } from '../../../utils/decorator/IsArrayOfIdUuidDTO.decorator';

export class BlockedTasksAnswerDTO {
  constructor(blockedTasks: IdUuidStatusDTO[]) {
    this.blockedTasks = blockedTasks;
  }

  @ApiProperty({
    isArray: true,
    type: String,
    description: 'An array of IDs representing blocked tasks.',
    example: [
      {
        ID: 'PPP-0001',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'TODO',
      },
      {
        ID: 'XYZ-0002',
        UUID: '00000000-0000-0000-0000-000000000002',
        status: 'IN_PROGRESS',
      },
    ],
  })
  @Expose({ name: 'blockedTasks', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  blockedTasks: IdUuidStatusDTO[];
}
