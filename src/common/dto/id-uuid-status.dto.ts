// user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID, IsIn, Matches } from 'class-validator';
import {
  DEFAULT_GENERAL_STATUS,
  GENERAL_STATUS_TYPES,
  GENERAL_STATUS_TYPE_ARRAY,
} from '../constant';
import { ID_MSG, UUID_MSG } from '../command/dto';

export class IdUuidStatusDTO {
  constructor(ID: string, UUID: string, status: GENERAL_STATUS_TYPES) {
    this.ID = ID;
    this.UUID = UUID;
    this.status = status;
  }

  // @ApiProperty({
  //   description: ID_MSG.message,
  //   example: ID_MSG.example,
  // })
  // @Expose({ name: 'ID', toPlainOnly: true })
  // @IsNotEmpty({ message: ID_MSG.requiredMessage })
  // @IsString({ message: ID_MSG.typeMessage })
  // @Matches(ID_MSG.regexp, {
  //   message: ID_MSG.errorMessage,
  // })
  @ApiProperty({
    description: 'ID is Unique identifier for ' + IdUuidStatusDTO.name,
    example: 'john.doe',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  ID: string;

  // @ApiProperty({
  //   description: UUID_MSG.message,
  //   example: UUID_MSG.example,
  // })
  // @Expose({ name: 'UUID', toPlainOnly: true })
  // @IsNotEmpty({ message: UUID_MSG.requiredMessage })
  // @IsString({ message: UUID_MSG.typeMessage })
  // @IsUUID('all', { message: UUID_MSG.errorMessage })
  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      IdUuidStatusDTO.name,
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsNotEmpty({ message: 'Please enter an UUID' })
  @IsString({ message: 'UUID must be a string' })
  @IsUUID('all', {
    message:
      'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
  })
  UUID: string;

  @ApiProperty({
    description:
      'The general status (' + GENERAL_STATUS_TYPE_ARRAY.join(', ') + ').',
    enum: GENERAL_STATUS_TYPE_ARRAY,
    example: DEFAULT_GENERAL_STATUS,
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsIn(GENERAL_STATUS_TYPE_ARRAY, {
    message: `Invalid general status. Possible values: ${GENERAL_STATUS_TYPE_ARRAY.join(
      ', ',
    )}`,
  })
  status: GENERAL_STATUS_TYPES;
}
